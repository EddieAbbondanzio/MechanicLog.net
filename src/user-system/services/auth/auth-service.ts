import axios from 'axios';
import { UserRegistration } from './user-registration';
import { User } from '../../entities/user';
import { UserPasswordReset } from './user-password-reset';
import { UserPasswordUpdate } from './user-password-update';
import { Service } from '@/core/services/service';
import { HttpResponse } from '@/core/http/http-response';
import { ServiceError } from '@/core/services/service-error';
import { Either } from '@/core/common/monads/either';
import { Maybe } from '@/core/common/monads/maybe';

/**
 * Service to log in users with the back end.
 */
export class AuthService extends Service {
    /**
     * Log in a user using their credentials.
     * @param email The email of the user
     * @param password The password of the user.
     * @param rememberMe If the user wants to be remembered.
     * @returns The issued auth token.
     */
    public async login(email: string, password: string, rememberMe: boolean = false): Promise<Either<string, ServiceError>> {
        try {
            const response: HttpResponse = await this._httpClient.post('/auth/login', {
                email,
                password,
            });

            return Either.left(response.data.token);
        } catch (error) {
            return Either.right(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Re login a user by validating their auth token.
     * @param authToken The JWT of the user.
     * @returns The same auth token if valid.
     */
    public async relogin(authToken: string): Promise<Either<string, ServiceError>> {
        try {
            await this._httpClient.patch('/auth/login', {}, authToken);
            return Either.left(authToken);
        } catch (error) {
            return Either.right(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Register a new user with the site.
     * @param userReg The user's details
     * @returns An auth token.
     */
    public async register(userReg: UserRegistration): Promise<Either<string, ServiceError>> {
        try {
            const response: HttpResponse = await this._httpClient.post('/auth/register', userReg);
            return Either.left(response.data.token);
        } catch (error) {
            return Either.right(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Verify a user's email.
     * @param user The user's email to verify.
     * @param emailToken The email token they entered.
     */
    public async verifyEmail(user: User, emailToken: string): Promise<Maybe<ServiceError>> {
        try {
            await this._httpClient.post(
                '/auth/verify',
                {
                    emailToken,
                },
                user.authToken
            );

            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Request a password reset for a user. This will send them an
     * email with a reset code.
     * @param email The email of the user.
     */
    public async requestPasswordReset(email: string): Promise<Maybe<ServiceError>> {
        try {
            await this._httpClient.post('/auth/password', {
                email,
            });

            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Send a password reset request to the backend.
     * @param passwordReset The password reset to submit
     */
    public async resetPassword(passwordReset: UserPasswordReset): Promise<Maybe<ServiceError>> {
        try {
            await this._httpClient.put('/auth/password', passwordReset);
            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Update a user's password.
     * @param user The user to update the password for.
     * @param passwordUpdate Their password update info.
     */
    public async updatePassword(user: User, passwordUpdate: UserPasswordUpdate): Promise<Maybe<ServiceError>> {
        try {
            await this._httpClient.patch('/auth/password', passwordUpdate, user.authToken);
            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }
}
