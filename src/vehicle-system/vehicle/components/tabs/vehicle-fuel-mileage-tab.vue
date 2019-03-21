<template>
    <card-container class="h-100 w-100">
        <add-fuel-trip-popup ref="addPopup" :vehicle="vehicle" @add="onAdd"/>
        <delete-fuel-trip-confirmation-popup ref="deletePopup" @delete="onDelete"/>
        <div class="mb-3 clearfix">
            <h2 class="float-left">Fuel</h2>

            <b-btn
                variant="success"
                style="height: 40px"
                class="rounded float-right"
                @click="onAddClick"
            >
                <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                <span style="vertical-align: middle;">Add</span>
            </b-btn>
        </div>
        <b-table :items="fuelTrips" :fields="columnNames" :busy="isLoading">
            <template slot="date" slot-scope="row">{{ row.value }}</template>
            <template slot="pricePerUnit" slot-scope="row">{{ row.value }}</template>
            <template slot="fuelUnits" slot-scope="row">{{ row.value }}</template>
            <template slot="distanceTravelled" slot-scope="row">{{ row.value }}</template>
            <template slot="fuelDistanceRatio" slot-scope="row">{{ row.value }}</template>
            <template slot="cost" slot-scope="row">{{ row.value }}</template>
            <template slot="options" slot-scope="row">
                <b-dropdown no-caret variant="link" class="maintenance-options">
                    <div slot="button-content">
                        <material-icon
                            icon="more_horiz"
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
    </card-container>
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

@Component({
    name: 'vehicle-fuel-mileage-tab',
    components: {
        CardContainer,
        MaterialIcon,
        AddFuelTripPopup,
        DeleteFuelTripConfirmationPopup,
    },
})
export default class VehicleFuelMileageTab extends VehicleMixin {
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
        { key: 'fuelDistanceRatio', label: 'MPG', class: 'align-middle', formatter: (val: number) => val.toFixed(2), sortable: true },
        { key: 'cost', label: 'Cost', class: 'align-middle', formatter: (val: number) => `$${val.toFixed(2)}`, sortable: true },
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
}
</script>