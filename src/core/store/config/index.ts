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
        baseUrl: 'http://localhost:8080',
        authTokenLifeSpan: '30d',
    },
    getters: {
        /**
         * Get the backend API url.
         * @param state The active config state.
         */
        apiUrl(state: ConfigState): string {
            return state.apiUrl;
        },

        /**
         * Get the auth token lifespan.
         * @param state The active config state.
         */
        authTokenLifeSpan(state: ConfigState): string {
            return state.authTokenLifeSpan;
        },
    },
};
