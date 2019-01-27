import Vue from 'vue';
import Router from 'vue-router';
import store from './core/store/store';

Vue.use(Router);

const router: Router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/public/home.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/private/dashboard.vue'),
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/public/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/public/sign-up.vue'),
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import ('./views/public/forgot.vue'),
    },
  ],
});

// Route guard for logged in users.
router.beforeEach((to, from, next) => {
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
