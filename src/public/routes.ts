import { Route, RouteConfig } from 'vue-router';
import PublicMasterPage from '@/public/components/public-master-page.vue';

export const publicRoutes: RouteConfig = {
    path: '/',
    component: PublicMasterPage,
    children: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/public/views/home.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/public/views/login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/public/views/sign-up.vue'),
        },
        {
            path: '/forgot',
            name: 'forgot',
            component: () => import('@/public/views/forgot.vue'),
        },
        {
            path: '/reset',
            name: 'reset',
            component: () => import('@/public/views/reset.vue'),
        },
        {
            path: '/goodbye',
            name: 'goodbye',
            component: () => import('@/public/views/goodbye.vue'),
        },
    ],
};
