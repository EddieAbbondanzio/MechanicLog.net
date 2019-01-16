
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
     * Create a new user.
     * @param name The name of the user.
     * @param email The email of the user.
     */
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}
