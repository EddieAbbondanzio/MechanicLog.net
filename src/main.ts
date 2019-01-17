import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './core/store/store';

Vue.config.productionTip = false;

const v: Vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
