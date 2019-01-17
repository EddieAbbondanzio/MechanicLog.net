
/**
 * User of the site.
 */
export class User {
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
     * @param authToken Their login token.
     * @param name The name of the user.
     * @param email The email of the user.
     * @param isVerified If the user verified their email.
     */
    constructor(authToken: string, name: string, email: string, isVerified: boolean) {
        this.authToken = authToken;
        this.name = name;
        this.email = email;
        this.isVerified = isVerified;
    }
}
