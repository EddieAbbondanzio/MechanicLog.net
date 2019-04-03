import { Nullable } from '@/core/common/monads/nullable';
import { Subscription } from '@/subscription-system/entities/subscription';

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
     * The username of the user.
     */
    public username: string;

    /**
     * If the user has verified their email.
     */
    public isVerified: boolean;

    /**
     * The subscription of the user.
     */
    public subscription!: Subscription;

    /**
     * Create a new user.
     * @param authToken The JWT of the user
     * @param name The name of the user.
     * @param email The email address of the user.
     * @param isVerified If the user is verified.
     */
    constructor(options: { authToken: string; name: string; username: string; email: string; isVerified: boolean }) {
        this.authToken = options.authToken;
        this.name = options.name;
        this.email = options.email;
        this.isVerified = options.isVerified;
        this.username = options.username;
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

    /**
     * Rebuild a user from it's raw object.
     * @param token The JWT of the user.
     * @param raw The raw user object.
     */
    public static fromRaw(token: string, raw: any): User {
        return new User({ authToken: token, name: raw.name, email: raw.email, username: raw.username, isVerified: raw.isVerified });
    }
}
