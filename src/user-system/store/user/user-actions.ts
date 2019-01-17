import { ActionTree, ActionContext } from 'vuex';
import { UserState } from './user-state';
import { StoreState } from '@/core/store/store-state';
import { UserCredentials } from '@/user-system/entities/user-credentials';

/**
 * Actions related to the user state.
 */
export const userActions: ActionTree<UserState, StoreState> = {
    /**
     * Log in a user in with the application.
     * @param context The active context.
     * @param credentials The user's credentials.
     */
    async logIn(context: ActionContext<UserState, StoreState>, credentials: UserCredentials): Promise<void> {
        // FUCk
    },
};
