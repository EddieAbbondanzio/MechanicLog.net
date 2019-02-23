import Vue from 'vue';
import Router from 'vue-router';
import store from './core/store/store';
import Goodbye from '@/views/public/goodbye.vue';
import PrivateMasterPage from '@/core/components/private/private-master-page.vue';
import PublicMasterPage from '@/core/components/public/public-master-page.vue';
import { publicRoutes } from '@/public/routes';
import { privateRoutes } from './private/routes';

Vue.use(Router);

/**
 * Main router of the app.
 */
const router: Router = new Router({
    routes: [publicRoutes, privateRoutes],
});

// Route guard for logged in users.
router.beforeEach((to, from, next) => {
    if (to.meta.disabled) {
        next({
            name: 'home',
        });
    }

    // Skip over routes that don't require auth.
    if (!to.meta.authRequired) {
        next();
        return;
    }

    if ((store.state as any).user.currentUser != null) {
        next();
    } else {
        next({
            path: '/login',
        });
    }
});

export default router;
