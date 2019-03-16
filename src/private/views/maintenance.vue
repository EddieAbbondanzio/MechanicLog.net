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
</style>

<template>
    <div class="container-fluid bg-light h-100">
        <error-popup ref="errorPopup"/>
        <add-maintenance-popup ref="addPopup" :vehicle="vehicle" @add="onMaintenanceAdd"/>

        <div class="row">
            <div class="col-12 px-0">
                <back-bar :href="{ name: 'vehicles' }">
                    <b-btn
                        variant="success"
                        @click="onAddClick"
                        style="height: 40px"
                        class="rounded float-right"
                    >
                        <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                        <span style="vertical-align: middle;">Add Maintenance</span>
                    </b-btn>
                </back-bar>
            </div>
        </div>

        <!-- Header -->
        <div class="row pt-3 px-3">
            <div class="col-12 col-lg-6 pl-0 pr-0 pr-lg-2" v-if="vehicle != null">
                <vehicle-details-card :vehicle="vehicle" @edit="onVehicleEdit"/>
            </div>

            <div class="col-6 col-lg-3 px-0 pt-3 pt-lg-0 px-lg-2" style="height: 200px;">
                <card-container>
                    <h5
                        class="text-center text-muted"
                        style="position: absolute; left: 0px; right: 0px;"
                        title="Month to date ownership cost is the total cost of maintenance in the past 30 days."
                    >MTD Ownership Cost</h5>

                    <div class="d-flex align-items-center w-100 h-100">
                        <div class="w-100 text-center">
                            <span class="display-4 text-success">$</span>
                            <span
                                class="display-3 text-dark"
                            >{{ stats != null ? stats.monthToDateCost.toFixed(2) : '0.00' }}</span>
                        </div>
                    </div>
                </card-container>
            </div>

            <div class="col-6 col-lg-3 px-0 pt-3 pt-lg-0 pl-3 pl-lg-2" style="height: 200px;">
                <card-container>
                    <h5
                        class="text-center text-muted"
                        style="position: absolute; left: 0px; right: 0px;"
                        title="Year to date ownership cost is the total cost of maintenance in the past 12 months."
                    >YTD Ownership Cost</h5>

                    <div class="d-flex align-items-center w-100 h-100">
                        <div class="w-100 text-center">
                            <span class="display-4 text-success">$</span>
                            <span
                                class="display-3 text-dark"
                            >{{ stats != null ? stats.yearToDateCost.toFixed(2) : '0.00' }}</span>
                        </div>
                    </div>
                </card-container>
            </div>
        </div>

        <!-- Table Header -->
        <div class="row pt-3 px-3">
            <div class="col-12 px-0">
                <card-container>
                    <!-- <hr style="height: 4px; border: none;" class="bg-light"> -->
                    <span class="text-muted">MAINTENANCE</span>

                    <div class="row pt-3">
                        <div class="col-11">
                            <div class="row">
                                <div class="col-1 col-lg-1">
                                    <span class="float-right">Mileage</span>
                                </div>
                                <div class="col-1">
                                    <span>Date</span>
                                </div>
                                <div class="col-2">
                                    <span>Mechanic</span>
                                </div>
                                <div class="col-3">
                                    <span>Service(s)</span>
                                </div>
                                <div class="col-2">
                                    <span class="float-right">Cost</span>
                                </div>
                                <div class="col-2">
                                    <!-- <span>Label</span> -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <hr class="my-0 py-0 bg-secondary" style="height 4px;">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <maintenance-summary
                                v-for="event in events"
                                :maintenanceEvent="event"
                                :key="event.id"
                                @delete="onMaintenanceDelete"
                            />
                        </div>
                    </div>
                </card-container>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Maybe } from '@/core/common/monads/maybe';
import { Nullable } from '@/core/common/monads/nullable';
import AddMaintenancePopup from '@/vehicle-system/vehicle/components/popups/add-maintenance-popup.vue';
import { MaintenanceService } from '@/vehicle-system/vehicle/entities/maintenance-service';
import { MaintenanceEvent } from '@/vehicle-system/vehicle/entities/maintenance-event';
import MaintenanceSummary from '@/vehicle-system/vehicle/components/maintenance-summary.vue';
import BackBar from '@/private/components/back-bar.vue';
import CardContainer from '@/core/components/cards/card-container.vue';
import VehicleDetailsCard from '@/vehicle-system/vehicle/components/cards/vehicle-details-card.vue';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import { MaintenanceEventStats } from '@/vehicle-system/vehicle/entities/maintenance-event-stats';

/**
 * Maintenance history page.
 */
@Component({
    name: 'maintenance',
    components: {
        MaterialIcon,
        AddMaintenancePopup,
        MaintenanceSummary,
        BackBar,
        CardContainer,
        VehicleDetailsCard,
        ErrorPopup,
    },
})
export default class Maintenance extends VehicleMixin {
    /**
     * Component references
     */
    public $refs!: {
        addPopup: AddMaintenancePopup;
        errorPopup: ErrorPopup;
    };

    /**
     * The maintenance events.
     */
    public events: MaintenanceEvent[] = [];

    /**
     * The vehicle being displayed
     */
    public vehicle: Nullable<Vehicle> = null;

    public stats: Nullable<MaintenanceEventStats> = null;

    /**
     * On page load, pull in the vehicle.
     */
    public async created(): Promise<void> {
        const vehicleId: number = Number.parseInt(this.$route.params.vehicleId, 10);
        this.vehicle = await this.$vehicleStore.getVehicle(vehicleId);

        if (this.vehicle != null) {
            this.events = await this.$vehicleStore.getMaintenanceEvents(this.vehicle);
            this.stats = await this.$vehicleStore.getMaintenanceEventStats(this.vehicle);
        }

        this.$forceUpdate();
    }

    /**
     * User wants to update the vehicle.
     */
    public async onVehicleEdit(vehicle: Vehicle): Promise<void> {
        await this.$vehicleStore.updateVehicle(vehicle);
    }

    /**
     * User clicked on the add maintenance button.
     */
    public onAddClick(): void {
        this.$refs.addPopup.show();
    }

    /**
     * Event handler for when a maintenance event is added to the vehicle.
     */
    public async onMaintenanceAdd(maintenance: MaintenanceEvent): Promise<void> {
        await this.$vehicleStore.addMaintenanceEvent(this.vehicle!, maintenance);
        this.events.push(maintenance);
        this.stats = await this.$vehicleStore.getMaintenanceEventStats(this.vehicle!);
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user wants to delete a event.
     */
    public async onMaintenanceDelete(maintenance: MaintenanceEvent): Promise<void> {
        const index = this.events.findIndex((e) => e.id === maintenance.id);

        if (index !== -1) {
            const result = await this.$vehicleStore.deleteMaintenanceEvent(this.vehicle!, maintenance);
            this.events.splice(index, 1);
        }

        this.stats = await this.$vehicleStore.getMaintenanceEventStats(this.vehicle!);
        this.$forceUpdate();
    }
}
</script>