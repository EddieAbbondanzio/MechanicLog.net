import { Route, RouteConfig } from 'vue-router';
import PublicMasterPage from '@/public/components/public-master-page.vue';

export const supportRoutes: RouteConfig = {
    path: '/',
    component: PublicMasterPage,
    children: [
        {
            path: 'contact',
            name: 'contact',
            component: () => import('./views/contact.vue'),
        },
    ],
};
