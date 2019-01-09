import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/public/home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/features',
      name: 'features',
      component: () => import('./views/public/features.vue'),
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('./views/public/pricing.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/public/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/public/register.vue'),
    },
  ],
});
