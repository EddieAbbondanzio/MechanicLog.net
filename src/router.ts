import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import ('./views/public/home.vue'),
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
