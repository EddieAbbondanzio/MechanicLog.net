import { RouteConfig } from 'vue-router';
import PrivateMasterPage from './components/private-master-page.vue';

export const privateRoutes: RouteConfig = {
    name: 'private',
    path: '/',
    component: PrivateMasterPage,
};
