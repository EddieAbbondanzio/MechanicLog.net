import { SubscriptionPlan } from './subscription-plan';
import { SubscriptionStatus } from './subscription-status';
import { DateUtils } from '@/core/common/utils/date-utils';
import { Nullable } from '@/core/common/monads/nullable';

export class Subscription {
    /**
     * The unqiue id of the subscription.
     */
    public id: number;

    /**
     * The current status of the subscription.
     */
    public status!: SubscriptionStatus;

    /**
     * The date the subscription started on.
     */
    public creationDate!: Date;

    /**
     * The next date that the subscription will bill on.
     */
    public renewalDate!: Date;

    /**
     * The date the subscription expired on. If the subscription is
     * active then this will be null.
     */
    public expirationDate!: Nullable<Date>;

    /**
     * The plan of the subscription.
     */
    public plan!: SubscriptionPlan;

    /**
     * Create a new subscription.
     * @param status The status of the subscription.
     * @param creationDate The date it began.
     * @param renewalDate The date it renews on next.
     * @param expirationDate The date it expires on.
     * @param plan The plan of the subscription.
     */
    constructor(status: SubscriptionStatus, creationDate: Date, renewalDate: Date, expirationDate: Nullable<Date>, plan: SubscriptionPlan) {
        this.id = 0;
        this.status = status;
        this.creationDate = creationDate;
        this.renewalDate = renewalDate;
        this.expirationDate = expirationDate;
        this.plan = plan;
    }

    /**
     * Rebuild a raw object to it's subscription counterpart.
     * @param raw The raw object to rebuild it from.
     */
    public static fromRaw(raw: any): Subscription {
        const plan = SubscriptionPlan.fromRaw(raw.plan);
        const s = new Subscription(
            raw.status,
            DateUtils.parse(raw.creationDate),
            DateUtils.parse(raw.renewalDate),
            raw.expirationDate != null ? DateUtils.parse(raw.expirationDate) : null,
            plan
        );
        s.id = raw.id;

        return s;
    }
}
