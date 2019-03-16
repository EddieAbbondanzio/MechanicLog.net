import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { UserFeedback } from '@/user-system/entities/user-feedback';

/**
 * Service for everything related to users.
 */
export class UserService extends Service {
    /**
     * Get the logged in user's info from their auth token.
     * @param authToken The auth token in use.
     * @returns The user who owns the token.
     */
    public async getUserFromToken(authToken: string): Promise<User> {
        const apiResponse = await this._httpClient.get('/v1/user', authToken);
        return User.fromRaw(authToken, apiResponse.data);
    }

    /**
     * Update a user's full name.
     * @param user The user to update.
     * @param newName Their new full name.
     */
    public async update(user: User): Promise<void> {
        const apiResponse = await this._httpClient.patch('/v1/user', { name: user.name, email: user.email }, user.authToken);
    }

    /**
     * Send a feedback message to the backend, and email the founder.
     * @param user The user sending the feedback.
     * @param feedback The feedback to send.
     */
    public async sendFeedback(user: User, feedback: UserFeedback): Promise<void> {
        const apiResponse = await this._httpClient.post('/v1/user/feedback', feedback, user.authToken);
    }
}
