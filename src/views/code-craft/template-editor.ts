import * as Vue from 'vue';
import Template1 from './template/template-1.vue';
import Template2 from './template/template-2.vue';

// ==================== 加载项目模块给远程模板使用 ====================
const moduleCache = {
    vue: Vue,
    Template1,
    Template2,
}

// ==================== 定义默认模板 ====================
const templateString = `
<template>
    {{content}}
</template>
<script setup lang="ts">
    {{script}}
</script>
<style scoped>
    {{style}}
</style>
`;

// 模拟从远程获取 Vue 文件字符串的函数
async function fetchVueFileAsString() {
    // 模拟的 Vue 文件字符串
    const simulatedVueFileString = `
<template>
    <div>
        <h1>学生数据表</h1>
        <table>
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>邮箱</th>
                    <th>地址</th>
                    <th>电话</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in sortedData" :key="student.email">
                    <td>{{ student.name }}</td>
                    <td>{{ student.age }}</td>
                    <td>{{ student.email }}</td>
                    <td>{{ student.address }}</td>
                    <td>{{ student.phone }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
    import {toRefs} from "vue";
    import Template1 from "Template1";
    import Template2 from "Template2";
    const props = defineProps(['templateData', 'templateMethod']);
    const { templateData: Data, templateMethod: DIM } = toRefs(props);
    const _ = DIM.value.lodash;
    const Utils = DIM.value.utils;

    // 使用lodash对数据进行排序
    const sortedData = _.orderBy(Data.value, ['age'], ['asc']);
</script>
<style scoped>
    div {
        color: blue;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }
    th {
        background-color: #f2f2f2;
    }
</style>
`;
    return { data: { template: simulatedVueFileString } };
}

export {
    moduleCache,
    templateString,
    fetchVueFileAsString // 导出模拟函数
}
