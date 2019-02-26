import { Nullable } from '@/core/common/monads/nullable';

/**
 * User of the site.
 */
export class User {
    /**
     * The current active user.
     */
    public static CURRENT: Nullable<User> = null;

    /**
     * Their auth token.
     */
    public authToken: string;

    /**
     * The full name of the user.
     */
    public name: string;

    /**
     * The contact email address.
     */
    public email: string;

    /**
     * If the user has verified their email.
     */
    public isVerified: boolean;

    /**
     * Create a new user.
     * @param authToken The JWT of the user
     * @param name The name of the user.
     * @param email The email address of the user.
     * @param isVerified If the user is verified.
     */
    constructor(authToken: string, name: string, email: string, isVerified: boolean) {
        this.authToken = authToken;
        this.name = name;
        this.email = email;
        this.isVerified = isVerified;
    }

    /**
     * Get the first name of the user.
     */
    public getFirstName(): string {
        if (this.name.indexOf(' ') !== -1) {
            return this.name.split(' ')[0];
        } else {
            return this.name;
        }
    }
}
