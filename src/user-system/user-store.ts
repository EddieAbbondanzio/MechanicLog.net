import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { Either } from '@/core/common/monads/either';
import { User } from './entities/user';
import { HttpError } from '@/core/http/service-error';
import { UserRegistration } from './services/auth/user-registration';
import { Maybe } from '@/core/common/monads/maybe';
import { Nullable } from '@/core/common/monads/nullable';
import { UserPasswordReset } from './services/auth/user-password-reset';
import { UserPasswordUpdate } from './services/auth/user-password-update';
import { UserService } from './services/user/user-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { AuthService } from './services/auth/auth-service';
import { UserFeedback } from './entities/user-feedback';

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
    private _userService!: UserService;

    /**
     * The underlying auth service to the database.
     */
    private _authService: AuthService;

    constructor() {
        super();
        this._userService = ServiceRegistry.resolve<UserService>(ServiceType.User);
        this._authService = ServiceRegistry.resolve<AuthService>(ServiceType.Auth);
    }

    /**
     * Log in a user in with the application.
     * @param email The user's email.
     * @param password The user's password.
     * @param remmeberMe If they want to be saved. (by Jesus of course)
     * @returns The logged in user.
     */
    public async login(email: string, password: string, rememberMe: boolean): Promise<Either<User, HttpError>> {
        const loginResponse = await this._authService.login(email, password, rememberMe);

        // Error out
        if (loginResponse.isRight()) {
            return Either.right(loginResponse.getRight());
        }

        const userResponse = await this._userService.getUserFromToken(loginResponse.getLeft());

        if (userResponse.isRight()) {
            return Either.right(userResponse.getRight());
        }

        User.CURRENT = userResponse.getLeft();
        return Either.left(userResponse.getLeft());
    }

    /**
     * Relogin a user using an auth token they were issued from a previous
     * visit.
     * @param authToken The auth token of the user.
     * @returns The logged in user.
     */
    public async relogin(authToken: string): Promise<Either<User, HttpError>> {
        const loginResponse = await this._authService.relogin(authToken);

        if (loginResponse.isRight()) {
            return Either.right(loginResponse.getRight());
        }

        const userResponse = await this._userService.getUserFromToken(loginResponse.getLeft());

        if (userResponse.isRight()) {
            return Either.right(userResponse.getRight());
        }

        User.CURRENT = userResponse.getLeft();
        return Either.left(userResponse.getLeft());
    }

    /**
     * Log out the active user.
     */
    public async logout(): Promise<void> {
        User.CURRENT = null;
    }

    /**
     * Register a new user with the system.
     * @param registration The new user's registration info.
     */
    public async register(registration: UserRegistration): Promise<Either<User, HttpError>> {
        const registerResponse = await this._authService.register(registration);

        if (registerResponse.isRight()) {
            return Either.right(registerResponse.getRight());
        }

        const userResponse = await this._userService.getUserFromToken(registerResponse.getLeft());

        if (userResponse.isRight()) {
            return Either.right(userResponse.getRight());
        }

        User.CURRENT = userResponse.getLeft();
        return Either.left(userResponse.getLeft());
    }

    /**
     * Verify the email of a user with the system. They only have
     * to do this once.
     * @param emailToken The email token of the user.
     */
    public async verifyEmail(emailToken: string): Promise<Maybe<HttpError>> {
        return this._authService.verifyEmail(User.CURRENT!, emailToken);
    }

    /**
     * Update the logged in user's email and name..
     * @param info The new info of the user.
     */
    public async updateInfo(info: { name: Nullable<string>; email: Nullable<string> }): Promise<Maybe<HttpError>> {
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
    public async requestPasswordReset(email: string): Promise<Maybe<HttpError>> {
        return this._authService.requestPasswordReset(email);
    }

    /**
     * Reset the password of a user using the code they were emailed.
     * @param passwordReset The password reset info.
     */
    public async resetPassword(passwordReset: UserPasswordReset): Promise<Maybe<HttpError>> {
        return this._authService.resetPassword(passwordReset);
    }

    /**
     * Update the existing password of the current user by first authenticating
     * their password.
     * @param passwordUpdate The password update info.
     */
    public async updatePassword(passwordUpdate: UserPasswordUpdate): Promise<Maybe<HttpError>> {
        return this._authService.updatePassword(User.CURRENT!, passwordUpdate);
    }

    /**
     * Send some feedback to the backend.
     * @param feedback The feedback to send.
     */
    public async sendFeedback(feedback: UserFeedback): Promise<Maybe<HttpError>> {
        return this._userService.sendFeedback(User.CURRENT!, feedback);
    }
}
