import { User } from '@/entities/user';

/**
 * Base configuration state
 */
export interface UserState {
    /**
     * The currently logged in user.
     */
    current?: User;
}
