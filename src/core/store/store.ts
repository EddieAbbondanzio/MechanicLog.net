import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { StoreState } from './store-state';
import { config } from './config';
import { user } from '@/user-system/store/user/index';

Vue.use(Vuex);

const storeOpts: StoreOptions<StoreState> = {
    state: {
        baseUrl: 'https://localhost:8080',
        version: '1.0.0',
    },
    modules: {
        config,
        user,
    },
};

export default new Vuex.Store(storeOpts);
