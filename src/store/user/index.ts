import { Module } from 'vuex';
import { UserState } from './user-state';
import { StoreState } from '../store-state';

/**
 * Config module for everything and anything related to the config.
 */
export const user: Module<UserState, StoreState> = {
    namespaced: true,
};
