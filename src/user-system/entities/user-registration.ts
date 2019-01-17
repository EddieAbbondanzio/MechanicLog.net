/**
 * Registration details of a new user.
 */
export interface UserRegistration {
    /**
     * The contact email of the user.
     */
    email: string;

    /**
     * The full name of the user.
     */
    name: string;

    /**
     * The desired password of the user.
     */
    password: string;
}
