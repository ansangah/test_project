// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue' // 예시
import Login from '@/views/Login.vue'
import Bookmark from '@/views/Bookmark.vue'
import Storage from '@/views/Storage.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/home',
                name: 'Home',
                component: HomeView, // 메인 콘텐츠가 여기에 들어갑니다
            },
            {
                path: '/bookmark',
                name: 'Bookmark',
                component: Bookmark,
            },
            // 필요한 만큼 페이지 추가
            {
                path: 'storage',
                name: 'Storage',
                component: Storage,
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => Login,
        meta: {
            layout: 'none'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
