import { RouteConfig } from 'vue-router';
import PrivateMasterPage from '@/private/components/private-master-page.vue';
import PublicMasterPage from '@/public/components/public-master-page.vue';

export const publicUserRoutes: RouteConfig = {
    path: '/',
    component: PublicMasterPage,
    children: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/user-system/views/public/login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/user-system/views/public/sign-up.vue'),
        },
        {
            path: '/forgot',
            name: 'forgot',
            component: () => import('@/user-system/views/public/forgot.vue'),
        },
        {
            path: '/reset',
            name: 'reset',
            component: () => import('@/user-system/views/public/reset.vue'),
        },
        {
            path: '/goodbye',
            name: 'goodbye',
            component: () => import('@/user-system/views/public/goodbye.vue'),
        },
    ],
};
