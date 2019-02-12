import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { StoreState } from './store-state';
import { config } from './config';
import { user } from '@/user-system/store/user/index';
import { vehicle } from '@/garage/store/vehicle/index';

Vue.use(Vuex);

const storeOpts: StoreOptions<StoreState> = {
    state: {
        version: '1.0.0',
    },
    modules: {
        config,
        user,
        vehicle,
    },
};

export default new Vuex.Store(storeOpts);
