<template>
    <div class="template-with-components">
        <component :is="TemplateRef"
                   class="child-index"
                   :templateData="templateData"
                   :templateMethod="templateMethod"
        />
    </div>
</template>

<script setup lang="ts">

// ==================== Imports ====================
import { computed, defineAsyncComponent, h, onErrorCaptured, onMounted, ref, watch } from 'vue';
import { loadModule } from 'vue3-sfc-loader';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { fetchVueFileAsString, moduleCache, templateString } from '@/views/code-craft/template-editor';

const props = defineProps({
    templateModelData: String,
    templateData: Object
})
const emit = defineEmits(['update:templateModelData', 'update:templateData']);

// ==================== 处理从后端获取的JSON数据源 ====================
const templateData = ref<any>()

watch(() => templateData.value, () => {
    // 双向绑定
    emit('update:templateData', templateData.value)
}, {
    deep: true
})

watch(() => props.templateData, () => {
    // 双向绑定
    templateData.value = props.templateData
})

// 读取远程数据
const getInitTemplateData = async () => {
    const generateStudentData = () => {
        return Array.from({ length: 10 }, () => ({
            name: faker.person.fullName(),
            age: faker.number.int({ min: 18, max: 25 }),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number()
        }));
    };

    const data = generateStudentData();
    return data;
}

// ==================== 处理远程模板数据及同步用户编辑的代码 ====================
const templateModelDataSelf = ref()

watch(()=> templateModelDataSelf.value, (value, oldValue) => {
    // 判断修改前和修改后的代码是否相同，相同就没不要再渲染了
    if (isEqCode(value, oldValue)) {
        return
    }
    // 双向绑定
    emit('update:templateModelData', templateModelDataSelf.value)
    debounceRandomNum()
})

watch(()=> props.templateModelData, async (value, oldValue) => {
    // 判断修改前和修改后的代码是否相同，相同就没必要同步了。
    if (isEqCode(value, oldValue)) {
        return
    }
    // 双向绑定
    templateModelDataSelf.value = value
})

// 每一次输入都让这个值变化，为了能让组件检测到用户输入的动作
const randomNum = ref(0)
const debounceRandomNum = _.debounce(() => {
    randomNum.value = Math.random()
}, 1000)

// 判断新代码和旧代码是否相同
const isEqCode = (value: string | undefined, oldValue: string | undefined) => {
    // 判断修改前和修改后的代码是否相同，相同就没不要再渲染了
    const normalizeCode = (str: string) => str.replace(/\s+/g, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const normalizedValue = normalizeCode(value || '');
    const normalizedOldValue = normalizeCode(oldValue || '');

    if (normalizedValue === normalizedOldValue) {
        console.log('代码相同，不渲染咯');
        return true
    }
    return false
}

// 读取远程代码模板
const options = {
    moduleCache,
    async getFile(url: string) {
        console.log('加载远程模板', url)
        const contentMatch = templateModelDataSelf.value.match(/<template>([\s\S]*?)<\/template>/);
        const scriptMatch = templateModelDataSelf.value.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/);
        const styleMatch = templateModelDataSelf.value.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/);

        const content = contentMatch ? contentMatch[1].trim() : '';
        const script = scriptMatch ? scriptMatch[1].trim() : '';
        const style = styleMatch ? styleMatch[1].trim() : '';

        return templateString
            .replace('{{content}}', content)
            .replace('{{script}}', script)
            .replace('{{style}}', style);
    },
    addStyle(textContent: any) {
        const style = Object.assign(document.createElement('style'), {
            textContent,
        });
        const styleRef = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, styleRef);
    },
};

// 获取远程代码模板数据
const getInitTemplateModelData = async () => {
    // const { data: { template } } = await axios.get('/simple-node/read-vue-file');
    const { data: { template } } = await fetchVueFileAsString();
    return template || ''
}

// ==================== 渲染远程模板 ====================
const TemplateRef = computed(() => initTemplateRef(randomNum.value))

// 特定情况渲染以下dom，不再获取远程组件
const preInit = () => {
    // 如果新建模板，则不获取远程组件
    if (!templateModelDataSelf.value) {
        return () => h('div', '');
    }
    // 组件报错时，直接打印错误消息
    if (hasAsyncComponentError.value) {
        // 重置错误捕获状态
        hasAsyncComponentError.value = false;

        return () => h('div', {
            style: { color: 'red' }
        }, asyncComponentErrorMessage.value);
    }
    return null
}

// 渲染远程模板
const initTemplateRef = (num: number) => defineAsyncComponent({
    loader: (async () => {
        // 特定情况渲染以下dom，不再获取远程组件
        const preRenderedRef = preInit()
        if (preRenderedRef) {
            return preRenderedRef
        }
        // 获取远程组件
        const res = await loadModule(
            `template${num.toString()}.vue`,
            options as any
        );
        return res;
    }) as any,
})

// 注入模板的固定方法和数据
const templateMethod = {
    lodash: _,
    utils: {
        getRandomNum: () => Math.floor(Math.random())
    }
}

// ==================== 首屏加载 ====================
onMounted(async () => {
    templateModelDataSelf.value = await getInitTemplateModelData()
    templateData.value = await getInitTemplateData();
})

// ==================== 远程模板错误处理 ====================
const hasAsyncComponentError = ref(false)
const asyncComponentErrorMessage = ref('');

// 捕获子组件的内部错误，网页编辑器经常会出现代码错误的情况
onErrorCaptured((err: any, instance: any, info: any) => {
    hasAsyncComponentError.value = true;
    asyncComponentErrorMessage.value = JSON.stringify(err.message);
    console.log('渲染过程出错', err, info)
    // 报错之后马上重新渲染一下组件，是为了把报错的日志打印出来
    debounceRandomNum()
    // 返回false阻止错误向上传递
    return false
})

</script>

<style scoped>

.template-with-components {
    height: 100vh;
}

</style>
