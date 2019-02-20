import { User } from '@/user-system/entities/user';

/**
 * Base configuration state
 */
export interface UserState {
    /**
     * The currently logged in user.
     */
    currentUser: User | null;
}
