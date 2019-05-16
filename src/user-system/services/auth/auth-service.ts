import axios from 'axios';
import { UserRegistration } from './user-registration';
import { User } from '../../entities/user';
import { UserPasswordReset } from './user-password-reset';
import { UserPasswordUpdate } from './user-password-update';
import { Service } from '@/core/services/service';
import { HttpResponse } from '@/core/http/http-response';
import { Either } from '@/core/common/monads/either';
import { Maybe } from '@/core/common/monads/maybe';

/**
 * Service to log in users with the back end.
 */
export class AuthService extends Service {
    public readonly type = 'auth';

    /**
     * Log in a user using their credentials.
     * @param email The email of the user
     * @param password The password of the user.
     * @param rememberMe If the user wants to be remembered.
     * @returns The issued auth token.
     */
    public async login(email: string, password: string, rememberMe: boolean = false): Promise<string> {
        const apiResponse = await this._httpClient.post('/v1/auth/login', {
            email,
            password,
        });

        return apiResponse.data.token;
    }

    /**
     * Re login a user by validating their auth token.
     * @param authToken The JWT of the user.
     * @returns The same auth token if valid.
     */
    public async relogin(authToken: string): Promise<string> {
        const apiResponse = await this._httpClient.patch('/v1/auth/login', {}, authToken);
        return apiResponse.data.token;
    }

    /**
     * Register a new user with the site.
     * @param userReg The user's details
     * @returns An auth token.
     */
    public async register(userReg: UserRegistration): Promise<string> {
        const apiResponse = await this._httpClient.post('/v1/auth/register', userReg);
        return apiResponse.data.token;
    }

    /**
     * Verify a user's email.
     * @param user The user's email to verify.
     * @param emailToken The email token they entered.
     */
    public async verifyEmail(user: User, emailToken: string): Promise<void> {
        const apiResponse = await this._httpClient.post(
            '/auth/verify',
            {
                emailToken,
            },
            user.authToken
        );
    }

    /**
     * Request a password reset for a user. This will send them an
     * email with a reset code.
     * @param email The email of the user.
     */
    public async requestPasswordReset(email: string): Promise<void> {
        const apiResponse = await this._httpClient.post('/v1/auth/password', {
            email,
        });
    }

    /**
     * Send a password reset request to the backend.
     * @param passwordReset The password reset to submit
     */
    public async resetPassword(passwordReset: UserPasswordReset): Promise<void> {
        const apiResponse = await this._httpClient.put('/v1/auth/password', passwordReset);
    }

    /**
     * Update a user's password.
     * @param user The user to update the password for.
     * @param passwordUpdate Their password update info.
     */
    public async updatePassword(user: User, passwordUpdate: UserPasswordUpdate): Promise<void> {
        const apiResponse = await this._httpClient.patch('/v1/auth/password', passwordUpdate, user.authToken);
    }
}
