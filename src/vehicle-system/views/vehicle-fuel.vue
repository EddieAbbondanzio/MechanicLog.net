<style lang="scss" scoped>
.stat-card {
    height: 128px !important;
    // border-left-width: 12px !important;
}
</style>

<template>
    <div class="row px-3">
        <div class="col-12 px-0 mx-0">
            <div class="row">
                <div class="col-6 pr-2 col-lg-3 pb-2 pb-lg-0">
                    <stat-card
                        title="Average MPG"
                        icon="local_gas_station"
                        :text="getAverageFuelDistanceRatio() | number(2)"
                        color="warning"
                    />
                </div>
                <div class="col-6 col-lg-3 pl-2 px-lg-2 pb-2 pb-lg-0">
                    <stat-card
                        title="Average Cost Per Gallon"
                        icon="attach_money"
                        :text="getAverageFuelUnitPrice() | currency"
                        color="success"
                    />
                </div>
                <div class="col-6 col-lg-3 pr-2 px-lg-2 pt-2 pt-lg-0">
                    <stat-card
                        title="Lifetime Fuel Cost"
                        icon="timeline"
                        :text="getLifetimeCost() | currency"
                        color="info"
                    />
                </div>
                <div class="col-6 col-lg-3 pl-2 pt-2 pt-lg-0">
                    <stat-card
                        title="Lifetime Fuel Consumed"
                        icon="trending_up"
                        :text="getLifetimeFuelConsumed() + ' gal.'"
                        color="danger"
                    />
                </div>
            </div>
        </div>

        <card-container class="row px-0 mx-0 mt-3 w-100 p-3" :noPadding="true">
            <div class="col-12">
                <add-fuel-trip-popup ref="addPopup" :vehicle="vehicle" @add="onAdd"/>
                <delete-fuel-trip-confirmation-popup ref="deletePopup" @delete="onDelete"/>
                <div class="mb-3 clearfix">
                    <h2 class="float-left">Fuel Fillups</h2>

                    <b-btn
                        variant="success"
                        style="height: 40px"
                        class="rounded float-right"
                        @click="onAddClick"
                    >
                        <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                        <span style="vertical-align: middle;">Add Fillup</span>
                    </b-btn>
                </div>

                <!-- Table -->
                <b-table :items="fuelTrips" :fields="columnNames" :busy="isLoading" class="w-100">
                    <template slot="date" slot-scope="row">{{ row.value }}</template>
                    <template slot="pricePerUnit" slot-scope="row">{{ row.value }}</template>
                    <template slot="fuelUnits" slot-scope="row">{{ row.value }}</template>
                    <template slot="distanceTravelled" slot-scope="row">{{ row.value }}</template>
                    <template slot="cost" slot-scope="row">{{ row.value }}</template>
                    <template slot="fuelDistanceRatio" slot-scope="row">
                        <span>{{ row.value }}</span>
                    </template>
                    <template slot="options" slot-scope="row">
                        <b-dropdown no-caret variant="link" class="maintenance-options">
                            <div slot="button-content">
                                <material-icon
                                    icon="more_vert"
                                    color="muted"
                                    size="md"
                                    class="align-middle m-0 p-0"
                                />
                            </div>

                            <b-dropdown-item
                                href="#"
                                class="text-danger"
                                @click="onDeleteClick(row.item.id)"
                            >Delete</b-dropdown-item>
                        </b-dropdown>
                    </template>
                </b-table>
            </div>
        </card-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardContainer from '@/core/components/cards/card-container.vue';
import { FuelTrip } from '@/vehicle-system/vehicle/entities/fuel-trip';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import MaterialIcon from '@/core/components/material-icon.vue';
import AddFuelTripPopup from '@/vehicle-system/vehicle/components/popups/add-fuel-trip-popup.vue';
import DeleteFuelTripConfirmationPopup from '@/vehicle-system/vehicle/components/popups/delete-fuel-trip-confirmation-popup.vue';
import { EventBus } from '@/core/event/event-bus';
import StatCard from '@/core/components/cards/stat-card.vue';

@Component({
    name: 'vehicle-fuel',
    components: {
        CardContainer,
        MaterialIcon,
        AddFuelTripPopup,
        DeleteFuelTripConfirmationPopup,
        StatCard,
    },
})
export default class VehicleFuel extends VehicleMixin {
    /**
     * References to children components.
     */
    public $refs!: {
        addPopup: AddFuelTripPopup;
        deletePopup: DeleteFuelTripConfirmationPopup;
    };

    /**
     * The vehicle being used.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The ID of the vehicle to delete.
     */
    public idToDelete: number = 0;

    /**
     * State of the table to track when to disable it.
     */
    public isLoading: boolean = false;

    public readonly columnNames = [
        { key: 'date', label: 'Date', class: 'align-middle', formatter: (val: Date) => val.toLocaleDateString(), sortable: true },
        { key: 'pricePerUnit', label: 'Price Per Gallon', class: 'align-middle', formatter: (val: number) => `$${val.toFixed(2)}`, sortable: true },
        { key: 'fuelUnits', label: 'Gallons', class: 'align-middle', sortable: true },
        { key: 'distanceTravelled', label: 'Miles', class: 'align-middle', sortable: true },
        { key: 'cost', label: 'Cost', class: 'align-middle', formatter: (val: number) => `$${val.toFixed(2)}`, sortable: true },
        { key: 'fuelDistanceRatio', label: 'MPG', class: 'align-middle', formatter: (val: number) => val.toFixed(2), sortable: true },
        { key: 'options', label: 'Options', class: 'align-middle' },
    ];
    /**
     * The fuel trips.
     */
    public fuelTrips: FuelTrip[] = [];

    public async created(): Promise<void> {
        try {
            EventBus.emit('loading');
            this.isLoading = true;
            this.fuelTrips = await this.$fuelTripStore.getFuelTrips(this.vehicle);
        } catch (error) {
            EventBus.emit('error', error.message);
        }

        EventBus.emit('loaded');
        this.isLoading = false;
    }

    public async onAddClick(): Promise<void> {
        this.$refs.addPopup.show();
    }

    /**
     * Event handler for when the user wants to initiate a delete.
     */
    public async onDeleteClick(id: number): Promise<void> {
        this.idToDelete = id;
        await this.$refs.deletePopup.show();
    }

    /**
     * User confirmed they want to add a new fuel trip.
     */
    public async onAdd(fuelTrip: FuelTrip): Promise<void> {
        try {
            EventBus.emit('loading');
            this.isLoading = true;
            await this.$fuelTripStore.addFuelTrip(this.vehicle, fuelTrip);
        } catch (error) {
            EventBus.emit('error', error.message);
        }

        EventBus.emit('loaded');
        this.isLoading = false;
    }

    /**
     * User has confirmed they want to delete the fuel trip.
     */
    public async onDelete(): Promise<void> {
        if (this.idToDelete !== 0) {
            const index = this.fuelTrips.findIndex((f: FuelTrip) => f.id === this.idToDelete);

            if (index === -1) {
                return;
            }

            try {
                EventBus.emit('loading');
                this.isLoading = true;
                await this.$fuelTripStore.deleteFuelTrip(this.fuelTrips[index]);
            } catch (error) {
                EventBus.emit('error', error.message);
            }
        }

        EventBus.emit('loaded');
        this.isLoading = false;
        this.idToDelete = 0;
    }

    /**
     * Compute the average MPG.
     */
    public getAverageFuelDistanceRatio(): number {
        if (this.fuelTrips.length === 0) {
            return 0;
        }

        return this.fuelTrips.map((f: FuelTrip) => f.fuelDistanceRatio).reduce((a: number, b: number) => a + b) / this.fuelTrips.length;
    }

    public getAverageFuelUnitPrice(): number {
        if (this.fuelTrips.length === 0) {
            return 0;
        }

        return this.fuelTrips.map((f: FuelTrip) => f.pricePerUnit).reduce((a, b) => a + b) / this.fuelTrips.length;
    }

    /**
     * Compute the total cost spent on gas.
     */
    public getLifetimeCost(): number {
        if (this.fuelTrips.length === 0) {
            return 0;
        }
        return this.fuelTrips.map((f: FuelTrip) => f.cost).reduce((a: number, b: number) => a + b);
    }

    public getLifetimeFuelConsumed(): number {
        if (this.fuelTrips.length === 0) {
            return 0;
        }
        return this.fuelTrips.map((f: FuelTrip) => f.fuelUnits).reduce((a, b) => a + b);
    }
}
</script>