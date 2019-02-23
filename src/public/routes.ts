import { Route, RouteConfig } from 'vue-router';
import PublicMasterPage from '@/public/components/public-master-page.vue';

export const publicRoutes: RouteConfig = {
    path: '/',
    name: 'public',
    component: PublicMasterPage,
    children: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/home.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/sign-up.vue'),
        },
        {
            path: '/forgot',
            name: 'forgot',
            component: () => import('./views/forgot.vue'),
        },
        {
            path: '/reset',
            name: 'reset',
            component: () => import('./views/reset.vue'),
        },
        {
            path: '/goodbye',
            name: 'goodbye',
            component: () => import('./views/goodbye.vue'),
        },
    ],
};
