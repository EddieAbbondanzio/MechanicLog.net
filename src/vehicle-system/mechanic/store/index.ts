import { MechanicState } from './mechanic-state';
import { StoreState } from '@/core/store/store-state';
import { mechanicGetters } from './mechanic-getters';
import { mechanicMutations } from './mechanic-mutations';
import { mechanicActions } from './mechanic-actions';
import { Module } from 'vuex';

/**
 * Starting state of the mechanic store.
 */
const state: MechanicState = {
    mechanics: [],
};

/**
 * Mechanic module for all things mechanic in Vuex.
 */
export const mechanic: Module<MechanicState, StoreState> = {
    namespaced: true,
    state,
    getters: mechanicGetters,
    mutations: mechanicMutations,
    actions: mechanicActions,
};
