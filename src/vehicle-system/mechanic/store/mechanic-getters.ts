import { GetterTree } from 'vuex';
import { MechanicState } from './mechanic-state';
import { StoreState } from '@/core/store/store-state';
import { Mechanic } from '../entities/mechanic';

/**
 * Getters for interacting with the mechanic Vuex store.
 */
export const mechanicGetters: GetterTree<MechanicState, StoreState> = {
    /**
     * Get all of the mechanics for the current user.
     * @param state The active store state.
     */
    mechanics(state: MechanicState): Mechanic[] {
        return state.mechanics;
    }
};
