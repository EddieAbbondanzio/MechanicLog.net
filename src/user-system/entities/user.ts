
/**
 * User of the site.
 */
export class User {
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
     * @param name The name of the user.
     * @param email The email of the user.
     * @param isVerified If the user verified their email.
     */
    constructor(name: string, email: string, isVerified: boolean) {
        this.name = name;
        this.email = email;
        this.isVerified = isVerified;
    }
}
