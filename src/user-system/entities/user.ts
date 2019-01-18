
/**
 * User of the site.
 */
export interface User {
    /**
     * Their auth token.
     */
    authToken: string;

    /**
     * The full name of the user.
     */
    name: string;

    /**
     * The contact email address.
     */
    email: string;

    /**
     * If the user has verified their email.
     */
    isVerified: boolean;
}
