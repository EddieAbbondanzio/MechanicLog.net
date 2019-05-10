import { RouteConfig } from 'vue-router/types/router';
import PrivateMasterPage from '@/core/components/private-master-page.vue';

export const userRoutes: RouteConfig = {
    path: '/user', // Don't delete the slash dummy. Routes that start with a / are treated as top level.
    component: PrivateMasterPage,
    children: [
        {
            path: 'subscription',
            name: 'user-subscription',
            component: () => import('@/user-system/views/subscription.vue'),
            meta: {
                authRequired: true,
            },
        },
        {
            path: 'settings',
            name: 'user-settings',
            component: () => import('@/user-system/views/settings.vue'),
            meta: {
                authRequired: true,
            },
        },
        {
            path: 'feedback',
            name: 'user-feedback',
            component: () => import('@/user-system/views/feedback.vue'),
            meta: {
                authRequired: true,
            },
        },
    ],
};
