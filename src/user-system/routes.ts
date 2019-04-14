import { RouteConfig } from 'vue-router';
import PrivateMasterPage from '@/private/components/private-master-page.vue';

export const userRoutes: RouteConfig = {
    path: '/',
    component: PrivateMasterPage,
    children: [
        {
            path: '/subscription',
            name: 'subscription',
            component: () => import('@/user-system/views/subscription.vue'),
            meta: {
                authRequired: true,
            },
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/user-system/views/settings.vue'),
            meta: {
                authRequired: true,
            },
        },
        {
            path: 'feedback',
            name: 'feedback',
            component: () => import('@/user-system/views/feedback.vue'),
            meta: {
                authRequired: true,
            },
        },
    ],
};
