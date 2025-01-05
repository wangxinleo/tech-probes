<template>
  <div class="home-container">
    <header class="header">
      <h1>wangxinleo 技术探针</h1>
      <nav class="nav">
        <a href="https://github.com/wangxinleo/tech-probes" class="nav-link" target="_blank">
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" class="github-icon" />
          GitHub
        </a>
      </nav>
    </header>
    <main class="main-content">
      <section class="intro">
        <h2>探索技术的世界</h2>
        <p>在这里，您可以找到各种技术探针，帮助您解决工作中的难题。</p>
      </section>
      <section class="features">
        <div class="feature-card">
          <router-link to="/table-export" class="feature-link">
            <h3>表格导出</h3>
          </router-link>
          <p>将网页表格数据导出为Docx格式的Word文档。</p>
        </div>
        <div class="feature-card">
          <router-link to="/echart-export" class="feature-link">
            <h3>Echart导出</h3>
          </router-link>
          <p>将ECharts图表导出为图片并插入到Word文档中。</p>
        </div>
        <div class="feature-card">
          <router-link to="/code-craft-index" class="feature-link">
            <h3>代码编辑预览</h3>
          </router-link>
          <p>编辑JSON数据和HTML模板，并实时预览效果。</p>
        </div>
      </section>
    </main>
    <footer class="footer">
      <p>©2025 wangxinleo技术探针</p>
    </footer>
  </div>
</template>

<script setup>
// 这个组件不需要额外的逻辑
</script>

<style scoped>
.home-container {
  font-family: 'Arial', sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.github-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.main-content {
  padding: 20px 0;
}

.intro {
  text-align: center;
  margin-bottom: 40px;
}

.features {
  display: flex;
  justify-content: space-around;
}

.feature-card {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 30%;
  text-align: center;
}

.feature-link {
  text-decoration: none;
  color: inherit;
}

.footer {
  text-align: center;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  margin-top: 40px;
}
</style> 