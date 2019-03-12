/**
 * Possible subscription states.
 */
export enum SubscriptionStatus {
    /**
     * User is trying out the app.
     */
    Trialing = 0,
    /**
     * Subscription is active, and auto renewing.
     */
    Active = 1,
    /**
     * Subscription will be cancelled at end of month..
     */
    PastDue = 2,
    /**
     * Subscription has been terminated..
     */
    Canceled = 3,
    /**
     * Payment failed and the subscription is inactive..
     */
    Unpaid = 4,
}
