import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { StoreState } from './store-state';
import { config } from './config';
import { user } from '@/user-system/store/user/index';
import { vehicle } from '@/vehicle-system/vehicle/store/index';
import { mechanic } from '@/vehicle-system/mechanic/store/index';

Vue.use(Vuex);

const storeOpts: StoreOptions<StoreState> = {
    state: {
        version: '1.0.0',
    },
    modules: {
        config,
        user,
        vehicle,
        mechanic,
    },
};

export default new Vuex.Store(storeOpts);
