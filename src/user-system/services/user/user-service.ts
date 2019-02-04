import { ApiService } from '@/core/services/api-service';
import { User } from '@/user-system/entities/user';
import { HttpResponse } from '@/core/http/http-response';

/**
 * Service for everything related to users.
 */
export class UserService extends ApiService {
    /**
     * Get the logged in user's info from their auth token.
     * @param authToken The auth token in use.
     * @returns The user who owns the token.
     */
    public async getUserFromToken(authToken: string): Promise<User> {
        try {
            const response: HttpResponse = await this._httpClient.get('/user', authToken);

            return {
                authToken: response.data.authToken,
                name: response.data.name,
                email: response.data.email,
                isVerified: response.data.isVerified,
            };
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update a user's full name.
     * @param user The user to update.
     * @param newName Their new full name.
     */
    public async updateName(user: User, newName: string): Promise<void> {
        try {
            await this._httpClient.patch('/user/name', {
                name: user.name,
            }, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update a user's email.
     * @param user The user to update.
     * @param newEmail Their new email.
     */
    public async updateEmail(user: User, newEmail: string): Promise<void> {
        try {
            await this._httpClient.patch('/user/name', {
                email: user.email,
            }, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }
}
