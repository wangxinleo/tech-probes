import { createRouter, createWebHistory } from 'vue-router'
import TableExport from '@/views/table-export/index.vue' // 导入TableExport组件
import Home from '@/views/home/index.vue' // 导入Home组件
import EchartExport from '@/views/echart-export/index.vue' // 导入EchartExport组件
import CodeCraftRoutes from '@/views/code-craft/routes.ts' // 导入CodeCraft模块的路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home // 设置默认路由为Home组件
  },
  {
    path: '/table-export',
    name: 'TableExport',
    component: TableExport // 设置TableExport路由
  },
  {
    path: '/echart-export',
    name: 'EchartExport',
    component: EchartExport // 设置EchartExport路由
  },
  ...CodeCraftRoutes // 将CodeCraft模块的路由添加到主路由中
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router