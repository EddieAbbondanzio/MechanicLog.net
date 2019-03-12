/**
 * A subscription plan that a user can subscribe to.
 */
export class SubscriptionPlan {
    /**
     * The unique identifier.
     */
    public id: string;

    /**
     * The name of the plan.
     */
    public name: string;

    /**
     * If the plan is currently active.
     */
    public isActive: boolean;

    /**
     * The cost in USD.
     */
    public amount: number;

    /**
     * If it's montly or yearly.
     */
    public interval: 'month' | 'year';

    /**
     * Create a new subscription plan.
     * @param id The ID of the plan.
     * @param name The name of the plan.
     * @param active If it's currently active
     * @param amount
     * @param interval
     */
    constructor(id: string, name: string, active: boolean, amount: number, interval: 'month' | 'year') {
        this.id = id;
        this.name = name;
        this.isActive = active;
        this.amount = amount;
        this.interval = interval;
    }

    /**
     * Rebuild the subscription plan.
     * @param raw The raw object to process.
     */
    public static fromRaw(raw: any): SubscriptionPlan {
        return new SubscriptionPlan(raw.id, raw.name, raw.isActive, raw.amount, raw.interval);
    }
}
