# tech-probes

## 简介

💡 一个技术探针集合，解决工作中的难点功能，助力开发者高效解决问题！

## ✨ 功能

- 📄 表格导出模块：支持将网页表格数据导出为Docx格式的Word文档，支持合并列，便于文档存档。
- 🌐 图表导出模块：支持将ECharts图表导出为图片并插入到Word文档中，轻松分享数据可视化结果。
- 📄 代码编辑预览模块：提供一个界面，用户可以编辑JSON数据和HTML模板，并实时预览效果。支持双向数据绑定和错误提示。支持从远程加载Vue组件模板，用户可以在本地编辑和预览。提供了数据生成和模板渲染的功能。


## 🛠️ 技术栈

- Vue 3
- Vite
- @codemirror/lang-json
- @codemirror/lang-vue
- @codemirror/theme-one-dark
- @faker-js/faker
- Axios
- Docxtemplater
- Docxtemplater-image-module-free
- ECharts
- File-saver
- Html2canvas
- Lodash
- PizZip
- vue-codemirror
- vue-router
- vue3-sfc-loader

## 📥 安装

1. 克隆仓库到本地：

   ```bash
   git clone https://github.com/wangxinleo/tech-probes.git
   ```

2. 进入项目目录：

   ```bash
   cd tech-probes
   ```

3. 安装依赖：

   ```bash
   npm install
   ```

## 🚀 使用

1. 启动开发服务器：

   ```bash
   npm run dev
   ```

2. 在浏览器中打开 `http://localhost:3000`，查看应用程序。

## 🗂️ 代码结构

- `src/App.vue`：主应用组件，包含生成数据和导出功能的实现。
- `src/views`：包含应用程序的其他组件。
- `src/router`：包含应用程序的路由配置。
- `src/assets`：包含应用程序的样式文件。

## 🤝 贡献

欢迎贡献代码！请提交Pull Request或报告问题。

## 📄 许可证

该项目使用MIT许可证。
