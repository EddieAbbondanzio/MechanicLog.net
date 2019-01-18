import { GetterTree } from 'vuex';
import { UserState } from './user-state';
import { StoreState } from '@/core/store/store-state';
import { User } from '@/user-system/entities/user';

/**
 * Getters for interacting with the user state.
 */
export const userGetters: GetterTree<UserState, StoreState> = {
    /**
     * Get the logged in user.
     * @param state The active store state.
     */
    current(state: UserState): User | null {
        return state.currentUser;
    },
};
