<style>
</style>

<template>
    <div class="container-fluid px-0">
        <!-- Header -->
        <div class="row pt-3">
            <div class="col-12 col-lg-6">
                <h2 v-if="vehicle != null">{{ vehicle.toString() }}</h2>

                <p
                    class="text-muted py-2 px-4"
                    style="font-size: 1.25em;"
                >Maintenance events are services, and/or repairs.</p>
            </div>

            <div class="col-12 col-lg-6">
                <div class="float-right d-inline-block">
                    <div class="d-inline-block pb2 pb-sm-0 pr-2">
                        <!-- Button on screen -->
                        <b-btn variant="success" @click="onAddClick" style="height: 40px">
                            <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                            <span style="vertical-align: middle;">Add Maintenance</span>
                        </b-btn>

                        <add-maintenance-popup ref="addPopup" :vehicle="vehicle"/>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table Header -->
        <div class="row">
            <div class="col-12 pb-2">
                <!-- <hr style="height: 4px; border: none;" class="bg-light"> -->
                <span class="text-muted">MAINTENANCE</span>
            </div>
        </div>

        <!-- Header Bar -->
        <div class="row py-2 header-row">
            <div class="col-10 col-lg-11">
                <div class="row">
                    <div class="col-2">
                        <span>Mileage</span>
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
                        <span>Cost</span>
                    </div>
                    <div class="col-2">
                        <span>Label</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 py-0 my-0">
                <hr class="my-0 py-0 bg-secondary" style="height 4px;">
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <maintenance-summary
                    v-for="event in events"
                    :maintenanceEvent="event"
                    :key="event.id"
                />
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
import AddMaintenancePopup from '@/vehicle-system/vehicle/components/add-maintenance-popup.vue';
import { MaintenanceService } from '@/vehicle-system/vehicle/entities/maintenance-service';
import { MaintenanceEvent } from '@/vehicle-system/vehicle/entities/maintenance-event';
import MaintenanceSummary from '@/vehicle-system/vehicle/components/maintenance-summary.vue';

/**
 * Maintenance history page.
 */
@Component({
    name: 'maintenance',
    components: {
        MaterialIcon,
        AddMaintenancePopup,
        MaintenanceSummary,
    },
})
export default class Maintenance extends VehicleMixin {
    /**
     * Component references
     */
    public $refs!: {
        addPopup: AddMaintenancePopup;
    };

    /**
     * The maintenance events.
     */
    public events!: MaintenanceEvent[];

    /**
     * The vehicle being displayed
     */
    public vehicle: Nullable<Vehicle> = null;

    /**
     * On page load, pull in the vehicle.
     */
    public async created(): Promise<void> {
        this.events = [];

        const vehicleId: number = Number.parseInt(this.$route.params.vehicleId, 10);
        const vehicles = await this.$vehicleStore.getVehicles();

        if (vehicles.isRight()) {
            throw vehicles.getRight();
        }

        this.vehicle = vehicles.getLeft().find((v: Vehicle) => v.id === vehicleId) || null;

        if (this.vehicle != null) {
            (await this.$vehicleStore.getMaintenanceEvents(this.vehicle!)).do(
                async (events) => {
                    this.events = events;
                }
            );
        }

        this.$forceUpdate();

        // const result: Maybe<Vehicle> = await this.$getVehicle(vehicleId);

        // if (result.hasSome()) {
        //     this.vehicle = result.getSome();
        // } else {
        //     this.$router.go(-1);
        // }
    }

    public onAddClick(): void {
        this.$refs.addPopup.show();
    }
}
</script>