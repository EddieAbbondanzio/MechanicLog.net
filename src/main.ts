import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './core/store/store';
import * as VueCookies from 'vue-cookies';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

const v: Vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

