<style lang="scss" scoped>
.stat-card {
    height: 128px !important;
    border-left-width: 12px !important;
}
</style>

<template>
    <div class="container-fluid m-0 p-0">
        <div class="row mb-3">
            <div class="col-12" v-if="vehicle != null">
                <vehicle-details-card :vehicle="vehicle"/>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-12" v-if="vehicle != null">
                <vehicle-purchase-info-card
                    :vehicle="vehicle"
                    :purchaseInfo="purchaseInfo"
                    @edit="onPurchaseInfoEdit"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import VehicleDetailsCard from "@/vehicle-system/components/cards/vehicle-details-card.vue";
import VehiclePurchaseInfoCard from "@/vehicle-system/components/cards/vehicle-purchase-info-card.vue";
import CardContainer from "@/core/components/cards/card-container.vue";
import { Vehicle } from "@/vehicle-system/entities/vehicle/vehicle";
import { VehiclePurchaseInfo } from "@/vehicle-system/entities/vehicle/vehicle-purchase-info";
import { VehicleMixin } from "../mixins/vehicle-mixin";
import { EventBus } from "@/core/event/event-bus";
import { Nullable } from "@/core/common/monads/nullable";

@Component({
    name: "vehicle-information",
    components: {
        VehicleDetailsCard,
        VehiclePurchaseInfoCard,
        CardContainer
    }
})
export default class VehicleInformation extends VehicleMixin {
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The purchase info of the vehicle.
     */
    public purchaseInfo: Nullable<VehiclePurchaseInfo> = null;

    public async created() {
        EventBus.emit("loading");

        try {
            this.purchaseInfo = await this.$vehiclePurchaseInfoStore.getVehiclePurchaseInfo(
                this.vehicle
            );
        } catch {
            this.purchaseInfo = new VehiclePurchaseInfo(this.vehicle.id);
        }

        EventBus.emit("loaded");
        this.$forceUpdate();
    }

    public async onPurchaseInfoEdit(newInfo: VehiclePurchaseInfo) {
        this.purchaseInfo = newInfo;
    }
}
</script>