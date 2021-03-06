<style lang="scss" scoped>
.subscription-plan-info {
    div {
        padding-bottom: 0.25em;
    }
}
</style>


<template>
    <page-content>
        <error-popup ref="errorPopup"/>

        <div slot="tool-bar">
            <span class="text-muted">Subscription</span>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-12 mx-0 px-0">
                    <loading-bar v-if="isLoading"/>
                </div>
            </div>

            <div class="row py-3">
                <div class="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
                    <card-container v-if="subscription != null">
                        <h4>Subscription</h4>
                        <hr class="pt-0 mt-0">

                        <div class="container-fluid subscription-plan-info">
                            <div class="row">
                                <div class="col-3 text-muted">Plan</div>
                                <div class="col-9">
                                    <span>{{ subscription.plan.name }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-muted">Vehicle Limit</div>
                                <div class="col-9">
                                    <span>{{ subscription.plan.vehicleCount }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-muted">Status</div>
                                <div class="col-9">
                                    <span>{{ getStatusToString() }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-muted">Start Date</div>
                                <div class="col-9">
                                    <span>{{ subscription.creationDate.toLocaleDateString() }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-muted">End Date</div>
                                <div class="col-9">
                                    <span>{{ subscription.renewalDate.toLocaleDateString() }}</span>
                                </div>
                            </div>
                        </div>
                    </card-container>
                </div>
            </div>

            <!-- <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
                    <card-container class="clearfix">
                        <b-btn variant="outline-secondary" :disabled="isLoading">Reset</b-btn>
                        <b-btn
                            class="float-right"
                            variant="success"
                            :disabled="isLoading"
                        >{{ isLoading ? 'Updating' : 'Update' }}</b-btn>
                    </card-container>
                </div>
            </div>-->
        </div>
    </page-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import CardContainer from '@/core/components/cards/card-container.vue';
import { User } from '@/user-system/entities/user';
import { Nullable } from '@/core/common/monads/nullable';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import LoadingBar from '@/core/components/ux/loading-bar.vue';
import { SubscriptionMixin } from '@/subscription-system/mixins/subscription-mixin.ts';
import { Subscription } from '@/subscription-system/entities/subscription';
import { SubscriptionStatus } from '@/subscription-system/entities/subscription-status';
import PageContent from '@/core/components/layout/page-content.vue';

/**
 * Settings page for updating the user.
 */
@Component({
    name: 'settings-page',
    components: {
        CardContainer,
        ErrorPopup,
        LoadingBar,
        PageContent,
    },
})
export default class Susbcription extends SubscriptionMixin {
    public isLoading = false;

    public subscription: Nullable<Subscription> = null;

    public async created(): Promise<void> {
        this.subscription = await this.$subscriptionStore.getSubscription();
    }

    /**
     * Get the description of the currnet status.
     */
    public getStatusToString(): string {
        if (this.subscription == null) {
            return '';
        } else {
            return SubscriptionStatus[this.subscription.status];
        }
    }
}
</script>