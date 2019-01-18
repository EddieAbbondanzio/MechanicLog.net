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
    logIn(state: UserState, user: User): void {
        state.currentUser = user;
    },

    /**
     * User has logged out of the application.
     * @param state The active user state.
     */
    logOut(state: UserState): void {
        state.currentUser = null;
    },

    /**
     * Mark the user as verified.
     * @param state The active user state.
     */
    verifyEmail(state: UserState): void {
        if (state.currentUser != null) {
            state.currentUser.isVerified = true;
        }
    },

    /**
     * Update the user's name.
     * @param state The active user state.
     * @param name The new name of the user.
     */
    updateName(state: UserState, name: string): void {
        if (state.currentUser != null) {
            state.currentUser.name = name;
        }
    },

    /**
     * Update the user's email.
     * @param state The active user state.
     * @param email The new email of the user.
     */
    updateEmail(state: UserState, email: string): void {
        if (state.currentUser != null) {
            state.currentUser.email = email;
        }
    },
};
