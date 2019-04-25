import { Route, RouteConfig } from 'vue-router';
import PublicMasterPage from '@/public/components/public-master-page.vue';

export const publicRoutes: RouteConfig = {
    path: '/',
    component: PublicMasterPage,
    children: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/home.vue'),
        },
        {
            path: '/features',
            name: 'features',
            component: () => import('./views/features.vue'),
        },
        {
            path: '/pricing',
            name: 'pricing',
            component: () => import('./views/pricing.vue'),
        },
    ],
};
