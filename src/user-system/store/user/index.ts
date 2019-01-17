import { Module } from 'vuex';
import { UserState } from './user-state';
import { StoreState } from '@/core/store/store-state';
import { userGetters } from './user-getters';
import { userMutations } from './user-mutations';
import { userActions } from './user-actions';

/**
 * Starting state of the user store.
 */
const state: UserState = {
    current: null,
};

/**
 * Config module for everything and anything related to the config.
 */
export const user: Module<UserState, StoreState> = {
    namespaced: true,
    state,
    getters: userGetters,
    mutations: userMutations,
    actions: userActions,
};
