import Vue from 'vue';
import Router from 'vue-router';
import { publicRoutes } from '@/public/routes';
import { User } from './user-system/entities/user';
import { vehicleRoutes } from './vehicle-system/routes/routes';
import { userRoutes } from './user-system/routes/routes';
import { supportRoutes } from './support/routes/routes';
import { EventBus } from './core/event/event-bus';

Vue.use(Router);

/**
 * Main router of the app.
 */
const router: Router = new Router({
    mode: 'history',
    routes: [publicRoutes, userRoutes, supportRoutes, vehicleRoutes],
});

// Route guard for logged in users.
router.beforeEach(async (to, from, next) => {
    // Cancel loading bar
    EventBus.emit('loaded');

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
