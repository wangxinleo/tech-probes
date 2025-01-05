export default [
    {
        path: '/code-craft-index',
        name: 'code-craft-index',
        component: () => import('./user-editable-template.vue'),
    },
    {
        path: '/code-craft-view',
        name: 'code-craft-view',
        component: () => import('./template-with-components.vue')
    },
]
