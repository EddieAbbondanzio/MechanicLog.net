import { ApiService } from '@/core/services/api-service';
import { User } from '@/user-system/entities/user';

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
        throw new Error('Not implemented');
    }

    /**
     * Update a user's full name.
     * @param user The user to update.
     * @param newName Their new full name.
     */
    public async updateName(user: User, newName: string): Promise<void> {

    }

    /**
     * Update a user's email.
     * @param user The user to update.
     * @param newEmail Their new email.
     */
    public async updateEmail(user: User, newEmail: string): Promise<void> {

    }
}