// mixin.js
import Vue from 'vue'
import Component from 'vue-class-component'
import { User } from '../entities/user';
import { Action } from 'vuex-class';
import { UserCredentials } from '../services/auth/user-credentials';

/**
 * Logic wrapper for handling logging in using a user's email
 * and password.
 */
@Component
export default class LoginMixin extends Vue {
    /**
     * Vuex action for logging in a user.
     */
    @Action('logIn', { namespace: 'user' })
    private loginUserAction!: (creds: UserCredentials) => Promise<User>;

    /**
     * Log in a user, and get their info, and an auth token back.
     * @param email The email of the user to log in with.
     * @param password The password of the user.
     */
    protected async loginUser(email: string, password: string): Promise<User> {
        return this.loginUserAction({ email, password });
    }
}