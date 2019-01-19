import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './core/store/store';
import * as VueCookies from 'vue-cookies';

Vue.config.productionTip = false;
Vue.use(VueCookies);

const v: Vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// alert(window.$cookies.get('user'));
// alert(store.getters['config/apiUrl']);
