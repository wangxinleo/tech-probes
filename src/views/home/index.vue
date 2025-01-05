<template>
  <div>
    <h1>欢迎来到主页</h1> <!-- 标题 -->
    <div>
      <div>
        <router-link to="/table-export">前往 表格导出 页面</router-link> <!-- 导航链接 -->
      </div>
      <div>
        <router-link to="/echart-export">前往 Echart导出 页面</router-link>
      </div>
      <div>
        <router-link to="/code-craft-index">前往 代码编辑预览 页面</router-link> <!-- 新增导航链接 -->
      </div>
    </div>
  </div>
</template>

<script setup>
// 这个组件不需要额外的逻辑
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style> 