import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './core/store/store';
import * as VueCookies from 'vue-cookies';
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    invalid: 'is-invalid',
  },
  events: 'blur',
});
Vue.use(BootstrapVue);

const v: Vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

