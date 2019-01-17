import { MutationTree } from 'vuex';
import { UserState } from './user-state';
import { User } from '@/user-system/entities/user';

/**
 * Mutations for the user store.
 */
export const userMutations: MutationTree<UserState> = {
    /**
     * User logged into the application.
     * @param state The active user state.
     * @param user The user that logged in.
     */
    loggedIn(state: UserState, user: User): void {
        state.current = user;
    },

    /**
     * User has logged out of the application.
     * @param state The active user state.
     */
    loggedOut(state: UserState): void {
        state.current = null;
    },
};
