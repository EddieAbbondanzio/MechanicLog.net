import { Module } from 'vuex';
import { ConfigState } from './config-state';
import { StoreState } from '../store-state';

/**
 * Config module for everything and anything related to the config.
 */
export const config: Module<ConfigState, StoreState> = {
    namespaced: true,
    state: {
        apiUrl: 'https://localhost:3117',
    },
    getters: {
        /**
         * Get the backend API url.
         * @param state The active config state.
         */
        apiUrl(state): string {
            return state.apiUrl;
        },
    },
};
