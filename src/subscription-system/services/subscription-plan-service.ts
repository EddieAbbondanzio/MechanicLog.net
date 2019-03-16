import { Service } from '@/core/services/service';
import { SubscriptionPlan } from '../entities/subscription-plan';
import { Either } from '@/core/common/monads/either';

/**
 * Subscription plan service client.
 */
export class SubscriptionPlanService extends Service {
    /**
     * Get all of the subscriptions from the backend.
     */
    public async getAllPlans(): Promise<SubscriptionPlan[]> {
        const apiResponse = await this._httpClient.get('/v1/subscription/plan');
        return apiResponse.data.map((p: any) => SubscriptionPlan.fromRaw(p));
    }
}
