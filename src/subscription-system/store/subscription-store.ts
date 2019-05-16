import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { SubscriptionService } from '../services/subscription-service';
import { SubscriptionPlanService } from '../services/subscription-plan-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { SubscriptionPlan } from '../entities/subscription-plan';
import { Nullable } from '@/core/common/monads/nullable';
import { Either } from '@/core/common/monads/either';
import { Subscription } from '../entities/subscription';
import { Maybe } from '@/core/common/monads/maybe';

/**
 * Store for all things subscription related.
 */
export class SubscriptionStore extends StoreModule {
    /**
     * The namespace of the store.
     */
    public readonly namespace: StoreModuleNamespace = 'subscription';

    /**
     * The subscription service.
     */
    private _subscriptionService: SubscriptionService;

    /**
     * The plan service for retrieving plans from.
     */
    private _subscriptionPlanService: SubscriptionPlanService;

    /**
     * The subscription of the user.
     */
    private _subscriptionCache: Nullable<Subscription>;

    /**
     * The subscription plan cache.
     */
    private _planCache: Nullable<SubscriptionPlan[]>;

    /**
     * Create a new subscription store module.
     */
    constructor() {
        super();
        this._subscriptionService = ServiceRegistry.resolve('subscription');
        this._subscriptionPlanService = ServiceRegistry.resolve('subscriptionPlan');
        this._subscriptionCache = null;
        this._planCache = null;
    }

    /**
     * Get all of the available subscription plans.
     */
    public async getPlans(): Promise<SubscriptionPlan[]> {
        if (this._planCache == null) {
            this._planCache = await this._subscriptionPlanService.getAllPlans();
        }

        return this._planCache;
    }

    /**
     * Get the subscription of the user.
     */
    public async getSubscription(): Promise<Subscription> {
        if (this._subscriptionCache == null) {
            const subscription = await this._subscriptionService.getSubscription();
            this._subscriptionCache = subscription;
        }

        return this._subscriptionCache;
    }

    /**
     * Change the user to a new subscription.
     * @param subscription The subscription to update.
     * @param newPlan The plan to switch to.
     */
    public async changeSubscriptionPlan(subscription: Subscription, newPlan: SubscriptionPlan): Promise<void> {
        await this._subscriptionService.changeSubscriptionPlan(subscription, newPlan);
        this._subscriptionCache = subscription;
    }

    /**
     * Cancel a user's subscription.
     * @param subscription The subscription to cancel.
     */
    public async cancelSubscription(subscription: Subscription): Promise<void> {
        await this._subscriptionService.cancelSubscription(subscription);
        this._subscriptionCache = subscription;
    }
}
