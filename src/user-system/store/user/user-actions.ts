import { ActionTree, ActionContext } from 'vuex';
import { UserState } from './user-state';
import { StoreState } from '@/core/store/store-state';
import { UserCredentials } from '@/user-system/services/auth/user-credentials';
import { AuthService } from '@/user-system/services/auth/auth-service';
import { User } from '@/user-system/entities/user';
import { UserService } from '@/user-system/services/user/user-service';
import { UserRegistration } from '@/user-system/services/auth/user-registration';
import { UserPasswordReset } from '@/user-system/services/auth/user-password-reset';
import { UserPasswordUpdate } from '@/user-system/services/auth/user-password-update';

/**
 * Actions related to the user state.
 */
export const userActions: ActionTree<UserState, StoreState> = {
    /**
     * Log in a user in with the application.
     * @param context The active context.
     * @param credentials The user's credentials.
     * @returns The logged in user.
     */
    async logIn(context: ActionContext<UserState, StoreState>, credentials: UserCredentials): Promise<User> {
        // Prepare the services needed.
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const authService: AuthService = new AuthService(apiUrl);
        const userService: UserService = new UserService(apiUrl);

        // Attempt to log in, and get the user's details.
        const authToken: string = await authService.login(credentials.email, credentials.password);
        const user: User = await userService.getUserFromToken(authToken);

        user.authToken = authToken;

        // Commit the user to the store, then pass it back.
        context.commit('logIn', user);
        return user;
    },

    /**
     * Relogin a user using an auth token they were issued from a previous
     * visit.
     * @param context The active context.
     * @param authToken The auth token of the user.
     * @returns The logged in user.
     */
    async relogIn(context: ActionContext<UserState, StoreState>, authToken: string): Promise<User> {
        // Prepare the services needed.
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const authService: AuthService = new AuthService(apiUrl);
        const userService: UserService = new UserService(apiUrl);

        // Validate the token with the server, then pull in the user info.
        authToken = await authService.relogin(authToken);
        const user: User = await userService.getUserFromToken(authToken);

        // Commit the user to the store, then pass it back.
        context.commit('logIn', user);
        return user;
    },

    /**
     * Log out the active user.
     * @param context The active context.
     */
    async logOut(context: ActionContext<UserState, StoreState>): Promise<void> {
        // Nothing async is required here, but it lets us keep things uniform.
        context.commit('logOut');
    },

    /**
     * Register a new user with the system.
     * @param context The active context.
     * @param registration The new user's registration info.
     */
    async register(context: ActionContext<UserState, StoreState>, registration: UserRegistration): Promise<User> {
        // Prepare the services needed.
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const authService: AuthService = new AuthService(apiUrl);
        const userService: UserService = new UserService(apiUrl);

        const authToken: string = await authService.register(registration);
        const user: User = await userService.getUserFromToken(authToken);

        // Commit the user to the store, then pass it back.
        context.commit('logIn', user);
        return user;
    },

    /**
     * Verify the email of a user with the system. They only have
     * to do this once.
     * @param context The active context.
     * @param emailToken The email token of the user.
     */
    async verifyEmail(context: ActionContext<UserState, StoreState>, emailToken: string): Promise<void> {
        // Prepare the services needed.
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const authService: AuthService = new AuthService(apiUrl);

        const user: User | null = context.rootGetters['user/current'];

        if (user != null) {
            await authService.verifyEmail(user, emailToken);
            context.commit('verifyEmail', user);
        }
    },

    /**
     * Update the logged in user's name.
     * @param context The active context.
     * @param name The new name of the user.
     */
    async updateName(context: ActionContext<UserState, StoreState>, name: string): Promise<void> {
        // Prepare the services needed.
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const userService: UserService = new UserService(apiUrl);

        const user: User | null = context.rootGetters['user/current'];

        if (user != null) {
            await userService.updateName(user, name);
            context.commit('updateName', name);
        }
    },

    /**
     * Update the logged in user's email.
     * @param context The active context.
     * @param email The new email of the user.
     */
    async updateEmail(context: ActionContext<UserState, StoreState>, email: string): Promise<void> {
        // Prepare the services needed.
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const userService: UserService = new UserService(apiUrl);

        const user: User | null = context.rootGetters['user/current'];

        if (user != null) {
            await userService.updateEmail(user, email);
            context.commit('updateEmail', email);
        }
    },

    /**
     * Initiate a password reset for a user. This will have the backend
     * email them a reset code.
     * @param context The active context.
     * @param email The email of the user.
     */
    async requestPasswordReset(context: ActionContext<UserState, StoreState>, email: string): Promise<void> {
        // Prepare the services needed.
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const authService: AuthService = new AuthService(apiUrl);

        await authService.requestPasswordReset(email);
    },

    /**
     * Reset the password of a user using the code they were emailed.
     * @param context The active context.
     * @param passwordReset The password reset info.
     */
    // tslint:disable-next-line:max-line-length
    async resetPassword(context: ActionContext<UserState, StoreState>, passwordReset: UserPasswordReset): Promise<void> {
        // Prepare the services needed.
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const authService: AuthService = new AuthService(apiUrl);

        await authService.resetPassword(passwordReset);
    },

    /**
     * Update the existing password of the current user by first authenticating
     * their password.
     * @param context The active context.
     * @param passwordUpdate The password update info.
     */
    // tslint:disable-next-line:max-line-length
    async updatePassword(context: ActionContext<UserState, StoreState>, passwordUpdate: UserPasswordUpdate): Promise<void> {
        // Prepare the services needed.
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const authService: AuthService = new AuthService(apiUrl);

        const user: User | null = context.rootGetters['user/current'];

        if (user != null) {
            await authService.updatePassword(user, passwordUpdate);
        }
    },
};
