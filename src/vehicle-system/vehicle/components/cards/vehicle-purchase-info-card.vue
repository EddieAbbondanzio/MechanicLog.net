<style lang="scss" scoped>
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.vehicle-purchase-info-edit {
    &:hover {
        background-color: $gray-200 !important;
    }
    &:active {
        background-color: $gray-300 !important;
    }
}
</style>

<template>
    <card-container v-if="purchaseInfo != null">
        <edit-vehicle-purchase-info-popup :purchaseInfo="purchaseInfo" ref="popup" @edit="onEdit"/>

        <a href="#" @click="onEditClick">
            <material-icon
                icon="edit"
                color="muted"
                size="md"
                class="float-right vehicle-purchase-info-edit p-1 rounded"
            />
        </a>

        <h4>Purchase Info</h4>

        <div class="row">
            <div class="col-2 text-muted">Date</div>
            <div class="col-5">{{ purchaseInfo.purchaseDate | formatDate }}</div>
        </div>
        <div class="row">
            <div class="col-2 text-muted">Mileage</div>
            <div class="col-5">{{ purchaseInfo.purchaseMileage }}</div>
        </div>
        <div class="row">
            <div class="col-2 text-muted">Price</div>
            <div class="col-5">{{ purchaseInfo.purchasePrice | currency }}</div>
        </div>
        <div class="row">
            <div class="col-2 text-muted">Seller Name</div>
            <div class="col-5">{{ purchaseInfo.sellerName }}</div>
        </div>
    </card-container>
    <card-container v-else>
        <h4>Purchase Info</h4>
    </card-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardContainer from '@/core/components/cards/card-container.vue';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import MaterialIcon from '@/core/components/material-icon.vue';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import EditVehiclePopup from '@/vehicle-system/vehicle/components/popups/edit-vehicle-popup.vue';
import { VehiclePurchaseInfo } from '@/vehicle-system/vehicle/entities/vehicle-purchase-info';
import { Nullable } from '@/core/common/monads/nullable';
import { User } from '@/user-system/entities/user';
import EditVehiclePurchaseInfoPopup from '@/vehicle-system/vehicle/components/popups/edit-vehicle-purchase-info-popup.vue';

/**
 * Card that shows off the purchase information
 */
@Component({
    name: 'vehicle-purchase-info-card',
    components: {
        CardContainer,
        MaterialIcon,
        EditVehiclePopup,
        EditVehiclePurchaseInfoPopup,
    },
})
export default class VehiclePurchaseInfoCard extends VehicleMixin {
    public $refs!: {
        popup: EditVehiclePurchaseInfoPopup;
    };

    /**
     * The vehicle of the card.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The purchase info to render.
     */
    @Prop()
    private purchaseInfo!: Nullable<VehiclePurchaseInfo>;

    public mounted(): void {
        console.log(this.purchaseInfo);
    }

    public async onEditClick(): Promise<void> {
        this.$refs.popup.show();
    }

    public async onEdit(purchaseInfo: VehiclePurchaseInfo): Promise<void> {
        await this.$vehiclePurchaseInfoStore.updateVehiclePurchaseInfo(purchaseInfo);
        this.$emit('edit', purchaseInfo);
    }
}
</script>