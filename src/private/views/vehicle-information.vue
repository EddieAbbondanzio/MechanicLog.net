<style lang="scss" scoped>
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.vehicle-detail-edit {
    &:hover {
        background-color: $gray-200 !important;
    }
    &:active {
        background-color: $gray-300 !important;
    }
}

.vehicle-information-tab {
    color: $secondary;
}

.vehicle-information-tab-active {
    color: $dark;
    position: relative;

    &:after {
        content: '';
        display: inline-block;
        left: 10px;
        right: 10px;
        bottom: 0px;
        position: absolute;
        margin-top: 4px;
        height: 4px;
        background-color: $primary;
    }
}

.vehicle-information-tab,
.vehicle-information-tab-active {
    text-align: center;
    display: inline-block;
    width: 148px;
    font-size: 1.25em;
    cursor: pointer;

    &:hover {
        background-color: $gray-200 !important;
    }

    &:active {
        background-color: $gray-300 !important;
    }
}
</style>

<template>
    <page-content v-if="vehicle != null">
        <error-popup ref="errorPopup"/>

        <div
            slot="tool-bar"
            class="d-flex flex-row align-items-center justify-content-between w-100"
        >
            <span class="text-muted">Garage > Vehicles > {{ vehicle.name }}</span>
        </div>

        <div class="container-fluid p-0 m-0 d-flex h-100 flex-column">
            <div class="row pb-3">
                <div class="col-12 d-flex flex-row align-items-center">
                    <!-- Car Picture -->
                    <div class="d-inline-block pr-4">
                        <div
                            class="rounded-circle border d-flex flex-row align-items-center justify-content-center bg-white"
                            style="height: 120px; width: 120px;"
                        >
                            <material-icon icon="camera_alt" color="secondary" size="xl"/>
                        </div>
                    </div>
                    <div>
                        <h1 class="pb-0 mb-0">{{ vehicle.name }}</h1>
                        <h3
                            class="text-muted"
                        >{{ vehicle.year }} {{ vehicle.make.name }} {{ vehicle.model.name }}</h3>
                    </div>
                </div>
            </div>

            <div class="row d-flex h-100">
                <div class="col-12 h-100">
                    <div>
                        <div
                            :class="{ 'vehicle-information-tab': activeTab != 1, 'vehicle-information-tab-active': activeTab == 1, 'p-2': true, 'mx-1': true, 'rounded': true  }"
                            @click="onTabClick(1)"
                        >Information</div>
                        <div
                            :class="{ 'vehicle-information-tab': activeTab != 2, 'vehicle-information-tab-active': activeTab == 2, 'p-2': true, 'mx-1': true, 'rounded': true  }"
                            @click="onTabClick(2)"
                        >Maintenance</div>
                        <div
                            :class="{ 'vehicle-information-tab': activeTab != 3, 'vehicle-information-tab-active': activeTab == 3, 'p-2': true, 'mx-1': true, 'rounded': true  }"
                            @click="onTabClick(3)"
                        >Fuel Mileage</div>
                    </div>

                    <div class="py-3 d-flex flex-column flex-fill">
                        <div v-if="activeTab == 1">
                            <vehicle-information-tab
                                :vehicle="vehicle"
                                :purchaseInfo="purchaseInfo"
                                @editDetails="onDetailsEdit"
                                @editPurchaseInfo="onPurchaseInfoEdit"
                            />
                        </div>
                        <div v-if="activeTab == 2">
                            <vehicle-maintenance-tab :vehicle="vehicle"/>
                        </div>
                        <div v-if="activeTab == 3">
                            <vehicle-fuel-mileage-tab :vehicle="vehicle"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </page-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Maybe } from '@/core/common/monads/maybe';
import { Nullable } from '@/core/common/monads/nullable';
import BackButton from '@/private/components/buttons/back-button.vue';
import CardContainer from '@/core/components/cards/card-container.vue';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import { MaintenanceEventStats } from '@/vehicle-system/vehicle/entities/maintenance-event-stats';
import PageContent from '@/private/components/layout/page-content.vue';
import VehicleInformationTab from '@/vehicle-system/vehicle/components/tabs/vehicle-information-tab.vue';
import VehicleMaintenanceTab from '@/vehicle-system/vehicle/components/tabs/vehicle-maintenance-tab.vue';
import VehicleFuelMileageTab from '@/vehicle-system/vehicle/components/tabs/vehicle-fuel-mileage-tab.vue';
import { VehiclePurchaseInfo } from '@/vehicle-system/vehicle/entities/vehicle-purchase-info';
import LoadingBar from '@/core/components/ux/loading-bar.vue';
import { EventBus } from '@/core/event/event-bus';

/**
 * Maintenance history page.
 */
@Component({
    name: 'maintenance',
    components: {
        MaterialIcon,
        BackButton,
        CardContainer,
        ErrorPopup,
        PageContent,
        VehicleInformationTab,
        VehicleMaintenanceTab,
        VehicleFuelMileageTab,
        LoadingBar,
    },
})
export default class VehicleInformation extends VehicleMixin {
    /**
     * Component references
     */
    public $refs!: {
        errorPopup: ErrorPopup;
    };

    /**
     * The vehicle being displayed
     */
    public vehicle: Vehicle = null!;

    public purchaseInfo: Nullable<VehiclePurchaseInfo> = null;

    public activeTab: number = 1;

    /**
     * On page load, pull in the vehicle.
     */
    public async created(): Promise<void> {
        EventBus.emit('loading');
        const vehicleId: number = Number.parseInt(this.$route.params.vehicleId, 10);
        this.vehicle = (await this.$vehicleStore.getVehicle(vehicleId)) as Vehicle;
        try {
            this.purchaseInfo = await this.$vehiclePurchaseInfoStore.getVehiclePurchaseInfo(this.vehicle);
        } catch {
            this.purchaseInfo = new VehiclePurchaseInfo(this.vehicle.id);
        }

        EventBus.emit('loaded');
        this.$forceUpdate();
    }

    public async onTabClick(index: number) {
        this.activeTab = index;
    }

    public async onDetailsEdit(vehicle: Vehicle) {
        this.vehicle = vehicle;
        this.$forceUpdate();
    }

    public async onPurchaseInfoEdit(purchaseInfo: VehiclePurchaseInfo) {
        this.purchaseInfo = purchaseInfo;
        this.$forceUpdate();
    }
}
</script>