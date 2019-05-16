import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { Either } from '@/core/common/monads/either';
import { User } from '../entities/user';
import { UserRegistration } from '../services/auth/user-registration';
import { Maybe } from '@/core/common/monads/maybe';
import { Nullable } from '@/core/common/monads/nullable';
import { UserPasswordReset } from '../services/auth/user-password-reset';
import { UserPasswordUpdate } from '../services/auth/user-password-update';
import { UserService } from '../services/user/user-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { AuthService } from '../services/auth/auth-service';
import { UserFeedback } from '../entities/user-feedback';
import { SubscriptionService } from '@/subscription-system/services/subscription-service';
import { CookieStorage } from '@/core/cookie-storage';

/**
 * Store for managing users.
 */
export class UserStore extends StoreModule {
    /**
     * The namespace of the store.
     */
    public readonly namespace: StoreModuleNamespace = 'user';

    /**
     * The underlying user service to the database.
     */
    private _userService: UserService;

    /**
     * The underlying auth service to the database.
     */
    private _authService: AuthService;

    /**
     * The subscription service.
     */
    private _subscriptionService: SubscriptionService;

    constructor() {
        super();
        this._userService = ServiceRegistry.resolve<UserService>('user');
        this._authService = ServiceRegistry.resolve<AuthService>('auth');
        this._subscriptionService = ServiceRegistry.resolve<SubscriptionService>('subscription');
    }

    /**
     * Log in a user in with the application.
     * @param email The user's email.
     * @param password The user's password.
     * @param remmeberMe If they want to be saved. (by Jesus of course)
     * @returns The logged in user.
     */
    public async login(email: string, password: string, rememberMe: boolean): Promise<User> {
        const token = await this._authService.login(email, password, rememberMe);
        const user = await this._userService.getUserFromToken(token);

        User.CURRENT = user;
        user.subscription = await this._subscriptionService.getSubscription();

        // Save their creds if they want
        if (rememberMe) {
            CookieStorage.set('auth', token, '90d');
        }

        return user;
    }

    /**
     * Relogin a user using an auth token they were issued from a previous
     * visit.
     * @param authToken The auth token of the user.
     * @returns The logged in user.
     */
    public async relogin(authToken: string): Promise<User> {
        const token = await this._authService.relogin(authToken);
        const user = await this._userService.getUserFromToken(token);

        User.CURRENT = user;
        user.subscription = await this._subscriptionService.getSubscription();

        return user;
    }

    /**
     * Log out the active user.
     */
    public async logout(): Promise<void> {
        User.CURRENT = null;
        CookieStorage.clear('auth');
    }

    /**
     * Register a new user with the system.
     * @param registration The new user's registration info.
     */
    public async register(registration: UserRegistration): Promise<User> {
        const token = await this._authService.register(registration);
        const user = await this._userService.getUserFromToken(token);

        User.CURRENT = user;
        user.subscription = await this._subscriptionService.getSubscription();

        return user;
    }

    /**
     * Verify the email of a user with the system. They only have
     * to do this once.
     * @param emailToken The email token of the user.
     */
    public async verifyEmail(emailToken: string): Promise<void> {
        return this._authService.verifyEmail(User.CURRENT!, emailToken);
    }

    /**
     * Update the logged in user's email and name..
     * @param info The new info of the user.
     */
    public async updateInfo(info: { name: Nullable<string>; email: Nullable<string> }): Promise<void> {
        if (info.name != null) {
            User.CURRENT!.name = info.name;
        }

        if (info.email != null) {
            User.CURRENT!.email = info.email;
        }

        return this._userService.update(User.CURRENT!);
    }

    /**
     * Initiate a password reset for a user. This will have the backend
     * email them a reset code.
     * @param email The email of the user.
     */
    public async requestPasswordReset(email: string): Promise<void> {
        return this._authService.requestPasswordReset(email);
    }

    /**
     * Reset the password of a user using the code they were emailed.
     * @param passwordReset The password reset info.
     */
    public async resetPassword(passwordReset: UserPasswordReset): Promise<void> {
        return this._authService.resetPassword(passwordReset);
    }

    /**
     * Update the existing password of the current user by first authenticating
     * their password.
     * @param passwordUpdate The password update info.
     */
    public async updatePassword(passwordUpdate: UserPasswordUpdate): Promise<void> {
        return this._authService.updatePassword(User.CURRENT!, passwordUpdate);
    }

    /**
     * Send some feedback to the backend.
     * @param feedback The feedback to send.
     */
    public async sendFeedback(feedback: UserFeedback): Promise<void> {
        return this._userService.sendFeedback(User.CURRENT!, feedback);
    }
}
