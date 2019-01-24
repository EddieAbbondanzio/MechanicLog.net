import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, Action } from 'vuex-class';
import { User } from '../entities/user';
import { UserCredentials } from '../services/auth/user-credentials';
import { UserRegistration } from '../services/auth/user-registration';
import { UserPasswordReset } from '../services/auth/user-password-reset';
import { UserPasswordUpdate } from '../services/auth/user-password-update';
import { CookieStorage } from '@/core/cookie-storage';

/**
 * User mixin for everything and anything related to users.
 */
@Component
export class UserMixin extends Vue {
    /**
     * The key to use to store cookies under.
     */
    private static COOKIE_KEY: string = 'user';

    /**
     * The currently logged in user.
     */
    @Getter('current', { namespace: 'user' })
    protected $currentUser!: User | null;

    /**
     * Register a new user with the site
     * @param userReg The user registration info
     */
    @Action('register', { namespace: 'user' })
    protected $register!: (userReg: UserRegistration) => Promise<User>;

    /**
     * Verify the email of the logged in user.
     * @param emailToken The email token that was sent to the user.
     */
    @Action('verifyEmail', { namespace: 'user' })
    protected $verifyEmail!: (emailToken: string) => Promise<void>;

    /**
     * Update the full name of the logged in user.
     * @param name The new full name.
     */
    @Action('updateName', { namespace: 'user' })
    protected $updateName!: (name: string) => Promise<void>;

    /**
     * Update the contact email of the logged in user. This will fail if the
     * email address is in use by another user.
     * @param email The new email address.
     */
    @Action('updateEmail', { namespace: 'user' })
    protected $updateEmail!: (email: string) => Promise<void>;

    /**
     * Request a password reset via the user's email.
     * @param email The email address of the user.
     */
    @Action('requestPasswordReset', { namespace: 'user' })
    protected $requestPasswordReset!: (email: string) => Promise<void>;

    /**
     * Reset the password of a user.
     * @param passwordReset The password reset info.
     */
    @Action('resetPassword', { namespace: 'user' })
    protected $resetPassword!: (passwordReset: UserPasswordReset) => Promise<void>;

    /**
     * Update the existing password of the logged in user.
     * @param passwordUpdate The password update info.
     */
    @Action('updatePassword', { namespace: 'user' })
    protected $updatePassword!: (passwordUpdate: UserPasswordUpdate) => Promise<void>;

    @Getter('authTokenLifeSpan', { namespace: 'config' })
    private _tokenLifeSpan!: string;

    @Action('logIn', { namespace: 'user' })
    private _loginUserAction!: (creds: UserCredentials) => Promise<User | null>;

    @Action('relogIn', { namespace: 'user' })
    private _relogInUserAction!: (authToken: string) => Promise<User | null>;

    @Action('logOut', { namespace: 'user' })
    private _logOutAction!: () => Promise<void>;

    /**
     * Log in a user, and get their info, and an auth token back.
     * @param email The email of the user to log in with.
     * @param password The password of the user.
     * @param rememberMe If the user wants to save their auth token.
     * @returns The logged in user.
     */
    protected async $login(email: string, password: string, rememberMe: boolean): Promise<User | null> {
        const user: User | null = await this._loginUserAction({ email, password });

        // Stop, no user found.
        if (user == null) {
            return null;
        }

        // Do we need to save a cookie?
        if (rememberMe) {
            CookieStorage.set(UserMixin.COOKIE_KEY, user.authToken, this._tokenLifeSpan);
        }

        return user;
    }

    /**
     * Log in a user using a previously stored auth token.
     * @returns The user if a token was found.
     */
    protected async $relogin(): Promise<User | null> {
        // Check for a cookie first
        if (!this.$hasAuthToken()) {
            return null;
        }

        const authToken: string | null = this.$getAuthToken();
        return await this._relogInUserAction(authToken!);
    }

    /**
     * Log out the existing user.
     */
    protected async $logOut(): Promise<void> {
        await this._logOutAction();
        CookieStorage.clear(UserMixin.COOKIE_KEY);
    }

    /**
     * Check if the user has an auth token from a previous login.
     * @returns True if there is an auth cookie from previously.
     */
    protected $hasAuthToken(): boolean {
        return CookieStorage.exists(UserMixin.COOKIE_KEY);
    }

    /**
     * Get the user's auth token.
     * @returns The token, or null.
     */
    protected $getAuthToken(): string | null {
        return CookieStorage.get(UserMixin.COOKIE_KEY);
    }
}
