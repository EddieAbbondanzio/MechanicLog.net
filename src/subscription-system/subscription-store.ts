import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { SubscriptionService } from './services/subscription-service';
import { SubscriptionPlanService } from './services/subscription-plan-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { SubscriptionPlan } from './entities/subscription-plan';
import { Nullable } from '@/core/common/monads/nullable';
import { Either } from '@/core/common/monads/either';
import { Subscription } from './entities/subscription';
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
        this._subscriptionService = ServiceRegistry.resolve(ServiceType.Subscription);
        this._subscriptionPlanService = ServiceRegistry.resolve(ServiceType.SubscriptionPlan);
        this._subscriptionCache = null;
        this._planCache = null;
    }

    /**
     * Get all of the available subscription plans.
     */
    public async getPlans(): Promise<Either<SubscriptionPlan[], Error>> {
        if (this._planCache == null) {
            const apiResult = await this._subscriptionPlanService.getAllPlans();

            if (apiResult.isLeft()) {
                this._planCache = apiResult.getLeft();
            } else {
                return apiResult;
            }
        }

        return Either.left(this._planCache);
    }

    /**
     * Get the subscription of the user.
     */
    public async getSubscription(): Promise<Either<Subscription, Error>> {
        if (this._subscriptionCache == null) {
            const apiResult = await this._subscriptionService.getSubscription();

            if (apiResult.isLeft()) {
                this._subscriptionCache = apiResult.getLeft();
            } else {
                return apiResult;
            }
        }

        return Either.left(this._subscriptionCache);
    }

    /**
     * Change the user to a new subscription.
     * @param subscription The subscription to update.
     * @param newPlan The plan to switch to.
     */
    public async changeSubscriptionPlan(subscription: Subscription, newPlan: SubscriptionPlan): Promise<Maybe<Error>> {
        const apiResult = await this._subscriptionService.changeSubscriptionPlan(subscription, newPlan);

        if (apiResult.hasSome()) {
            return Maybe.some(apiResult.getSome());
        }

        this._subscriptionCache = subscription;
        return Maybe.none();
    }

    /**
     * Cancel a user's subscription.
     * @param subscription The subscription to cancel.
     */
    public async cancelSubscription(subscription: Subscription): Promise<Maybe<Error>> {
        const apiResult = await this._subscriptionService.cancelSubscription(subscription);

        // Error out.
        if (apiResult.hasSome()) {
            return Maybe.some(apiResult.getSome());
        }

        this._subscriptionCache = subscription;
        return Maybe.none();
    }
}
