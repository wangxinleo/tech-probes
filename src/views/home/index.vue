<template>
  <div>
    <h1>欢迎来到主页</h1> <!-- 标题 -->
    <div>
      <div>
        <router-link to="/table-export">前往表格导出页面</router-link> <!-- 导航链接 -->
      </div>
      <div>
        <router-link to="/echart-export">前往Echart导出页面</router-link>
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