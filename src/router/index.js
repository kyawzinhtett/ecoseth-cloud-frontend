import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home/HomeView.vue')
        },
        {
            path: '/stake',
            name: 'stake',
            component: () => import('@/views/Stake/StakeView.vue')
        },
        {
            path: '/pool',
            name: 'pool',
            component: () => import('@/views/Stake/PoolView.vue')
        }
    ]
})

export default router
