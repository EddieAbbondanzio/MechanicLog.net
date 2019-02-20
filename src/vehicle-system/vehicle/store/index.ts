import { Module } from 'vuex';
import { StoreState } from '@/core/store/store-state';
import store from '@/core/store/store';
import { VehicleState } from './vehicle-state';
import { vehicleGetters } from './vehicle-getters';
import { vehicleMutations } from './vehicle-mutations';
import { vehicleActions } from './vehicle-actions';

/**
 * Starting state of the user store.
 */
const state: VehicleState = {
    vehicles: [],
};

/**
 * Config module for everything and anything related to the config.
 */
export const vehicle: Module<VehicleState, StoreState> = {
    namespaced: true,
    state,
    getters: vehicleGetters,
    mutations: vehicleMutations,
    actions: vehicleActions,
};
