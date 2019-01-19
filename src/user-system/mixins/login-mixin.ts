import Vue from 'vue';
import Component from 'vue-class-component';
import { User } from '../entities/user';
import { Action } from 'vuex-class';
import { UserCredentials } from '../services/auth/user-credentials';

/**
 * Logic wrapper for handling logging in using a user's email
 * and password.
 */
@Component
export class LoginMixin extends Vue {
    /**
     * Vuex action for logging in a user.
     */
    @Action('logIn', { namespace: 'user' })
    private loginUserAction!: (creds: UserCredentials) => Promise<User | null>;

    /**
     * Log in a user, and get their info, and an auth token back.
     * @param email The email of the user to log in with.
     * @param password The password of the user.
     * @param rememberMe If the user wants to save their auth token.
     */
    protected async loginUser(email: string, password: string, rememberMe: boolean): Promise<User | null> {
        const user: User | null = await this.loginUserAction({ email, password });

        // Stop, no user found.
        if (user == null) {
            return null;
        }

        // Do we need to save a cookie?
        if (rememberMe) {
            this.$cookies.set('user', user.authToken, '30d', undefined, undefined, false);
        }

        return user;
    }
}
