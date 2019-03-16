import { Service } from '@/core/services/service';
import { Subscription } from '../entities/subscription';
import { Either } from '@/core/common/monads/either';
import { SubscriptionPlan } from '../entities/subscription-plan';
import { Maybe } from '@/core/common/monads/maybe';
import { User } from '@/user-system/entities/user';

/**
 * Service for managing the user's subscription.
 */
export class SubscriptionService extends Service {
    /**
     * Get the subscription of the user.
     */
    public async getSubscription(): Promise<Subscription> {
        const apiResponse = await this._httpClient.get('/v1/subscription/', User.CURRENT!.authToken);
        return Subscription.fromRaw(apiResponse.data);
    }

    /**
     * Change the subscription plan of the user.
     * @param subscription The subscription to change.
     * @param newPlan The new plan they want.
     */
    public async changeSubscriptionPlan(subscription: Subscription, newPlan: SubscriptionPlan): Promise<void> {
        const apiResponse = await this._httpClient.patch('/v1/subscription/', { planId: newPlan.id }, User.CURRENT!.authToken);
        const s = new Subscription(subscription.status, subscription.creationDate, subscription.renewalDate, subscription.expirationDate, newPlan);
        s.id = subscription.id;
    }

    /**
     * Cancel the user's subscription.
     * @param subscription The subscription to cancel.
     */
    public async cancelSubscription(subscription: Subscription): Promise<void> {
        const apiResponse = await this._httpClient.delete('/v1/subscription/', User.CURRENT!.authToken);
    }
}
