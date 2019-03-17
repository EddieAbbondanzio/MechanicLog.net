/**
 * An error indicating that a user's subscription has expired.
 */
export class SubscriptionExpiredError extends Error {
    /**
     * Create a new subscription expired error.
     * @param message The error message.
     */
    constructor(message: string = 'Your subscription has expired.') {
        super(message);
    }
}
