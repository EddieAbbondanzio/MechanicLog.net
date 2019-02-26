import Vue from 'vue';
import Router from 'vue-router';
import { publicRoutes } from '@/public/routes';
import { privateRoutes } from './private/routes';
import { User } from './user-system/entities/user';

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

    if (User.CURRENT != null) {
        next();
    } else {
        next({
            path: '/login',
        });
    }
});

export default router;
