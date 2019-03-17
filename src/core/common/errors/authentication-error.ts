/**
 * An error for failed authentication.
 */
export class AuthenticationError extends Error {
    /**
     * Create a new authentication error.
     * @param message The error message.
     */
    constructor(message: string = 'Invalid credentials') {
        super(message);
    }
}
