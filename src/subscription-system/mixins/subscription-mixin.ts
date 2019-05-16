import Vue from 'vue';
import Component from 'vue-class-component';
import { Store } from '@/core/store/store';
import { SubscriptionStore } from '@/subscription-system/store/subscription-store';

/**
 * Subscription mixin for everything and anything related to users.
 */
@Component
export class SubscriptionMixin extends Vue {
    /**
     * The cache for user info.
     */
    public $subscriptionStore!: SubscriptionStore;

    /**
     * When the mixin is created pull in the store.
     */
    public created(): void {
        this.$subscriptionStore = Store.resolve('subscription');
    }
}
