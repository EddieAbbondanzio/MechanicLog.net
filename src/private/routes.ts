import { RouteConfig } from 'vue-router';
import PrivateMasterPage from './components/private-master-page.vue';

export const privateRoutes: RouteConfig = {
    name: 'private',
    path: '/',
    component: PrivateMasterPage,
    children: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('./views/dashboard.vue'),
            meta: {
                authRequired: true,
                disabled: true,
            },
        },
        {
            path: '/subscription',
            name: 'subscription',
            component: () => import('./views/subscription.vue'),
            meta: {
                authRequired: true,
            },
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('./views/settings.vue'),
            meta: {
                authRequired: true,
            },
        },
        {
            path: 'feedback',
            name: 'feedback',
            component: () => import('./views/feedback.vue'),
            meta: {
                authRequired: true,
            },
        },
        {
            name: 'garage',
            path: '/garage',
            component: () =>
                import('@/vehicle-system/components/garage-container.vue'),
            children: [
                {
                    path: 'vehicles',
                    name: 'vehicles',
                    component: () => import('./views/vehicles.vue'),
                    meta: {
                        authRequired: true,
                    },
                },
                {
                    path: 'vehicles/:vehicleId/maintenance',
                    name: 'maintenance',
                    component: () => import('./views/maintenance.vue'),
                    meta: {
                        authRequired: true,
                    },
                },
                {
                    path: 'mechanics',
                    name: 'mechanics',
                    component: () => import('./views/mechanics.vue'),
                    meta: {
                        authRequired: true,
                    },
                },
            ],
        },
    ],
};
