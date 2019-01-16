import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { StoreState } from './store-state';
import { config } from './config';
import { user } from './user';

Vue.use(Vuex);

const storeOpts: StoreOptions<StoreState> = {
    state: {
        version: '1.0.0',
    },
    modules: {
        config,
        user,
    },
};

export default new Vuex.Store(storeOpts);
