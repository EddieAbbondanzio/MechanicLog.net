import Vue from 'vue';
import App from './app.vue';
import router from './router';
import * as VueCookies from 'vue-cookies';
import VeeValidate, { Validator } from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';
import VueStripeCheckout from 'vue-stripe-checkout';
import { phoneNumberVeeRule } from '@/core/validation/phone-number-vee-rule';
import { zipCodeVeeRule } from './core/validation/zip-code-vee-rule';
import { ServiceRegistry } from './core/services/service-registry';
import { Store } from './core/store/store';
import '@/core/filters/number-filters';
import '@/core/filters/date-filters';

Validator.extend('phone-number', phoneNumberVeeRule);
Validator.extend('zip-code', zipCodeVeeRule);

ServiceRegistry.initialize();
Store.initialize();

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VeeValidate, {
    classes: true,
    classNames: {
        invalid: 'is-invalid',
    },
    events: 'blur',
    fieldsBagName: '$fields',
});
Vue.use(BootstrapVue);
Vue.use(VueStripeCheckout, 'pk_test_pAE8iUOuNnFxmQRYITJsHiiT');

const v: Vue = new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
