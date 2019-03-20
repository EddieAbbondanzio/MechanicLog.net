<style lang="scss" scoped>
.stat-card {
    height: 128px !important;
    border-left-width: 12px !important;
}
</style>


<template>
    <div class="container-fluid m-0 p-0">
        <div class="row mb-3">
            <div class="col-12">
                <vehicle-details-card :vehicle="vehicle" @edit="onDetailsEdit"/>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-12">
                <vehicle-purchase-info-card
                    :vehicle="vehicle"
                    :purchaseInfo="purchaseInfo"
                    @edit="onPurchaseInfoEdit"
                />
            </div>
        </div>

        <div class="row">
            <!-- <div class="col-6 col-lg-3 pr-1 pl-lg-3 pr-lg-2">
                <card-container
                    class="stat-card border-danger border-top-0 border-right-0 border-bottom-0"
                >
                    <h4>Lifetime Miles</h4>
                </card-container>
            </div>
            <div class="col-6 col-lg-3 px-lg-2">
                <card-container
                    class="stat-card border-warning border-top-0 border-right-0 border-bottom-0"
                >
                    <h4>YTD Miles</h4>
                </card-container>
            </div>-->
            <!-- <div class="col-6 col-lg-3 pr-1 pl-lg-3 pr-lg-2">
                <card-container
                    class="stat-card border-success border-top-0 border-right-0 border-bottom-0"
                >
                    <h4>Lifetime Cost</h4>
                </card-container>
            </div>
            <div class="col-6 col-lg-3 pt-3 pl-lg-2 pr-lg-3 pt-lg-0">
                <card-container
                    class="stat-card border-info border-top-0 border-right-0 border-bottom-0"
                >
                    <h4>YTD Cost</h4>
                </card-container>
            </div>-->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import VehicleDetailsCard from '@/vehicle-system/vehicle/components/cards/vehicle-details-card.vue';
import VehiclePurchaseInfoCard from '@/vehicle-system/vehicle/components/cards/vehicle-purchase-info-card.vue';
import CardContainer from '@/core/components/cards/card-container.vue';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import { VehiclePurchaseInfo } from '@/vehicle-system/vehicle/entities/vehicle-purchase-info';

@Component({
    name: 'vehicle-information-tab',
    components: {
        VehicleDetailsCard,
        VehiclePurchaseInfoCard,
        CardContainer,
    },
})
export default class VehicleInformationTab extends Vue {
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The purchase info of the vehicle.
     */
    @Prop()
    public purchaseInfo!: VehiclePurchaseInfo;

    public onDetailsEdit(vehicle: Vehicle) {
        this.$emit('editDetails', vehicle);
    }

    public onPurchaseInfoEdit(purchaseInfo: VehiclePurchaseInfo) {
        this.$emit('editPurchaseInfo', purchaseInfo);
    }
}
</script>