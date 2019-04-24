import { RouteConfig } from 'vue-router/types/router';
import PrivateMasterPage from '@/private/components/private-master-page.vue';

export const privateUserRoutes: RouteConfig = {
    path: '/',
    children: [
        {
            path: '/',
            component: PrivateMasterPage,
            children: [
                {
                    path: '/subscription',
                    name: 'subscription',
                    component: () => import('@/user-system/views/private/subscription.vue'),
                    meta: {
                        authRequired: true,
                    },
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: () => import('@/user-system/views/private/settings.vue'),
                    meta: {
                        authRequired: true,
                    },
                },
                {
                    path: 'feedback',
                    name: 'feedback',
                    component: () => import('@/user-system/views/private/feedback.vue'),
                    meta: {
                        authRequired: true,
                    },
                },
            ],
        },
    ],
};
