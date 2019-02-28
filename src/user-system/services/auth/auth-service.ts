import axios from 'axios';
import { UserRegistration } from './user-registration';
import { User } from '../../entities/user';
import { UserPasswordReset } from './user-password-reset';
import { UserPasswordUpdate } from './user-password-update';
import { Service } from '@/core/services/service';
import { HttpResponse } from '@/core/http/http-response';
import { HttpError } from '@/core/http/service-error';
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
    public async login(email: string, password: string, rememberMe: boolean = false): Promise<Either<string, HttpError>> {
        const apiResponse: Either<HttpResponse, HttpError> = await this._httpClient.post('/v1/auth/login', {
            email,
            password,
        });

        if (apiResponse.isLeft()) {
            return Either.left(apiResponse.getLeft().data.token);
        } else {
            return Either.right(apiResponse.getRight());
        }
    }

    /**
     * Re login a user by validating their auth token.
     * @param authToken The JWT of the user.
     * @returns The same auth token if valid.
     */
    public async relogin(authToken: string): Promise<Either<string, HttpError>> {
        const apiResponse = await this._httpClient.patch('/v1/auth/login', {}, authToken);

        if (apiResponse.isLeft()) {
            return Either.left(authToken);
        } else {
            return Either.right(apiResponse.getRight());
        }
    }

    /**
     * Register a new user with the site.
     * @param userReg The user's details
     * @returns An auth token.
     */
    public async register(userReg: UserRegistration): Promise<Either<string, HttpError>> {
        const apiResponse = await this._httpClient.post('/v1/auth/register', userReg);

        if (apiResponse.isLeft()) {
            return Either.left(apiResponse.getLeft().data.authToken);
        } else {
            return Either.right(apiResponse.getRight());
        }
    }

    /**
     * Verify a user's email.
     * @param user The user's email to verify.
     * @param emailToken The email token they entered.
     */
    public async verifyEmail(user: User, emailToken: string): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.post(
            '/auth/verify',
            {
                emailToken,
            },
            user.authToken
        );

        if (apiResponse.isLeft()) {
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }

    /**
     * Request a password reset for a user. This will send them an
     * email with a reset code.
     * @param email The email of the user.
     */
    public async requestPasswordReset(email: string): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.post('/v1/auth/password', {
            email,
        });

        if (apiResponse.isLeft()) {
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }

    /**
     * Send a password reset request to the backend.
     * @param passwordReset The password reset to submit
     */
    public async resetPassword(passwordReset: UserPasswordReset): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.put('/v1/auth/password', passwordReset);

        if (apiResponse.isLeft()) {
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }

    /**
     * Update a user's password.
     * @param user The user to update the password for.
     * @param passwordUpdate Their password update info.
     */
    public async updatePassword(user: User, passwordUpdate: UserPasswordUpdate): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.patch('/v1/auth/password', passwordUpdate, user.authToken);

        if (apiResponse.isLeft()) {
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }
}
