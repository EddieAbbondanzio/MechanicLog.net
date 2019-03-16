/**
 * A subscription plan that a user can subscribe to.
 */
export class SubscriptionPlan {
    /**
     * The unique identifier.
     */
    public id!: number;

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
     * How many vehicles the user may have.
     */
    public vehicleCount: number;

    /**
     * Create a new subscription plan.
     * @param id The ID of the plan.
     * @param name The name of the plan.
     * @param active If it's currently active
     * @param amount The cost per interval.
     * @param interval The payment interval.
     * @param vehicleCount The number of vehicles they can have.
     */
    constructor(id: number, name: string, active: boolean, amount: number, interval: 'month' | 'year', vehicleCount: number) {
        this.name = name;
        this.isActive = active;
        this.amount = amount;
        this.interval = interval;
        this.vehicleCount = vehicleCount;
    }

    /**
     * Rebuild the subscription plan.
     * @param raw The raw object to process.
     */
    public static fromRaw(raw: any): SubscriptionPlan {
        return new SubscriptionPlan(raw.id, raw.name, raw.isActive, raw.amount, raw.interval, raw.vehicleCount);
    }
}
