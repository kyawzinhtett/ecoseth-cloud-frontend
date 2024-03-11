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
        },
        {
            path: '/asset/:address',
            name: 'asset',
            component: () => import('@/views/Stake/AssetView.vue')
        },
        {
            path: '/claim/:address',
            name: 'claim',
            component: () => import('@/views/Stake/ClaimView.vue')
        },
        {
            path: '/swap/:address',
            name: 'swap',
            component: () => import('@/views/Stake/SwapView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/About/AboutView.vue')
        },
        {
            path: '/support',
            name: 'support',
            component: () => import('@/views/Support/SupportView.vue')
        }
    ]
})

export default router
