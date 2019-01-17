import axios from 'axios';
import { UserRegistration } from './user-registration';
import { User } from '../../entities/user';
import { UserPasswordReset } from './user-password-reset';
import { UserPasswordUpdate } from './user-password-update';
import { ApiService } from '@/core/services/api-service';
import { HttpResponse } from '@/core/http/http-response';

/**
 * Service to log in users with the back end.
 */
export class AuthService extends ApiService {
    /**
     * Log in a user using their credentials.
     * @param email The email of the user
     * @param password The password of the user.
     * @returns The issued auth token.
     */
    public async login(email: string, password: string): Promise<string> {
        try {
            const response: HttpResponse<{ token: string }> = await this._httpClient.post('/auth/login', {
                email,
                password,
            });

            return response.data.token;
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Re login a user by validating their auth token.
     * @param authToken The JWT of the user.
     * @returns The same auth token if valid.
     */
    public async relogin(authToken: string): Promise<string> {
        try {
            const response: HttpResponse<void> = await this._httpClient.patch('/auth/login', {}, authToken);
            return authToken;
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Register a new user with the site.
     * @param userReg The user's details
     * @returns An auth token.
     */
    public async register(userReg: UserRegistration): Promise<string> {
        try {
            const response: HttpResponse<{ token: string }> = await this._httpClient.post('/auth/register', userReg);
            return response.data.token;
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Verify a user's email.
     * @param user The user's email to verify.
     * @param emailToken The email token they entered.
     */
    public async verifyEmail(user: User, emailToken: string): Promise<void> {
        try {
            const response: HttpResponse<void> = await this._httpClient.post('/auth/verify', {
                emailToken,
            }, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Request a password reset for a user. This will send them an
     * email with a reset code.
     * @param email The email of the user.
     */
    public async requestPasswordReset(email: string): Promise<void> {
        try {
            const response: HttpResponse<void> = await this._httpClient.post('/auth/password', {
                email,
            });
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Send a password reset request to the backend.
     * @param passwordReset The password reset to submit
     */
    public async resetPassword(passwordReset: UserPasswordReset): Promise<void> {
        try {
            const response: HttpResponse<void> = await this._httpClient.put('/auth/password', passwordReset);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update a user's password.
     * @param user The user to update the password for.
     * @param passwordUpdate Their password update info.
     */
    public async updatePassword(user: User, passwordUpdate: UserPasswordUpdate): Promise<void> {
        try {
            const response: HttpResponse<void> = await this._httpClient.patch('/auth/password',
                passwordUpdate, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }
}
