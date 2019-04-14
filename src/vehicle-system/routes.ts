import { RouteConfig } from 'vue-router';
import PrivateMasterPage from '@/private/components/private-master-page.vue';

export const vehicleRoutes: RouteConfig = {
    path: '/',
    component: PrivateMasterPage,
    children: [
        {
            path: 'vehicles',
            name: 'vehicles',
            component: () => import('@/vehicle-system/views/vehicles.vue'),
            meta: {
                authRequired: true,
            },
        },
        {
            path: 'vehicles/:vehicleId/',
            name: 'vehicle',
            component: () => import('@/vehicle-system/components/vehicle-master-page.vue'),
            meta: {
                authRequired: true,
            },
            children: [
                {
                    path: 'information',
                    name: 'vehicle-information',
                    component: () => import('@/vehicle-system/views/vehicle-information.vue'),
                    meta: {
                        authRequired: true,
                    },
                },
                {
                    path: 'maintenance',
                    name: 'vehicle-maintenance',
                    component: () => import('@/vehicle-system/views/vehicle-maintenance.vue'),
                    meta: {
                        authRequired: true,
                    },
                },
                {
                    path: 'fuel',
                    name: 'vehicle-fuel',
                    component: () => import('@/vehicle-system/views/vehicle-fuel.vue'),
                    meta: {
                        authRequired: true,
                    },
                },
            ],
        },
        {
            path: 'vehicles/:vehicleId/maintenance/:maintenanceId',
            name: 'maintenance',
            component: () => import('@/vehicle-system/views/maintenance.vue'),
            meta: {
                authRequired: true,
            },
        },
    ],
};
