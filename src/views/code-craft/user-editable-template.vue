<template>
    <div class="user-editable-template">
        <div class="mobile">
            <div class="title">数据来源</div>
            <div v-if="templateDataErrorMsg" class="error">{{templateDataErrorMsg}}</div>
            <codemirror
                :style="{flex: '1', overflow: 'auto'}"
                v-model="templateDataStringify"
                :autofocus="true"
                :indent-with-tab="true"
                :tab-size="2"
                :extensions="templateDataExtensions"
                @change="templateDataStringifyChangeHandle($event)"
            />
        </div>
        <div class="mobile codeInput">
            <div class="title">模板编辑</div>
            <codemirror
                :style="{flex: '1', overflow: 'auto'}"
                v-model="templateModelData"
                :autofocus="true"
                :indent-with-tab="true"
                :tab-size="2"
                :extensions="templateModelDataExtensions"
            />

        </div>
        <div class="mobile">
            <div class="title">单Vue页面演示远程组件</div>
            <div class="phone-frame">
                <div class="phone-screen">
                    <!-- 在这里放置手机端网页内容 -->
                    <LocalChild class="edit" v-model:templateModelData="templateModelData" v-model:templateData="templateData"/>
                </div>
            </div>

        </div>
    </div>


</template>

<script setup lang="ts">
// ==================== Imports ====================
import { ref, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { vue } from '@codemirror/lang-vue';
import { oneDark } from '@codemirror/theme-one-dark';
import LocalChild from './template-with-components.vue';

const templateModelDataExtensions = [vue(), oneDark]
const templateDataExtensions = [json(), oneDark]

// ==================== 处理JSON数据源 ====================
const templateData = ref()

// JSON报错提醒
const templateDataErrorMsg = ref()
// JSON数据转成string数据存储在这里
const templateDataStringify = ref()

// 获取到JSON数据后要转化成string数据在代码编辑器中显示
watch(() => templateData.value, (value) => {
    try {
        templateDataErrorMsg.value = '';
        templateDataStringify.value = JSON.stringify(value, null, 2);
    } catch (e) {
        templateDataErrorMsg.value = '接口返回的 JSON 格式错误，请检查接口！';
    }
}, {
    deep: true
})

// 用户编辑数据后需要可视化数据交给模板进行下一步处理
const templateDataStringifyChangeHandle = (value: string) =>{
    try {
        templateDataErrorMsg.value = '';
        templateData.value = JSON.parse(value);
    } catch (e) {
        templateDataErrorMsg.value = '用户输入的 JSON 格式错误，请重新输入！';
    }
}

// ==================== 处理html模板数据 ====================
const templateModelData = ref();



</script>

<style scoped>
.user-editable-template {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: 95vh;
}
.user-editable-template .mobile {
    flex: 0 0 200px; /* 固定宽度 */
    display: flex;
    flex-direction: column;
    border: solid 1px;
    margin: 0 10px;
}
.user-editable-template .mobile .title {
    font-weight: bolder;
    font-size: 20px;
    background-color: lightgray;
}
.user-editable-template .mobile .edit {
    flex: 1;
    overflow: auto;
}
.user-editable-template .mobile .error {
    color: red;
}
.user-editable-template .codeInput {
    flex: 1; /* 占据剩余空间 */
    display: flex;
    flex-direction: column;
    border: solid 1px;
    margin: 0 10px;
}
.user-editable-template .phone-frame {
    width: 375px;
    height: 812px;
    border: 16px solid black;
    border-radius: 36px;
    position: relative;
    background-color: #f0f0f0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    margin: auto;
}
.user-editable-template .phone-screen {
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: hidden;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
}
</style>
