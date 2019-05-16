<template>
    <popup-container
        id="addFuelTrip"
        ref="popup"
        title="Add Fuel Trip"
        size="lg"
        headerColor="primary"
    >
        <form>
            <b-form-group>
                <label class="required" for="add-fuel-trip-date-textbox">Date</label>
                <input
                    type="date"
                    class="form-control"
                    id="add-fuel-trip-date-textbox"
                    v-model="date"
                    name="addFuelTripDate"
                    v-validate="`required`"
                >
                <b-form-invalid-feedback class="d-block">{{ errors.first('addFuelTripDate') }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
                <label class="required" for="add-fuel-trip-price-per-unit-textbox">Price Per Gallon</label>
                <input
                    type="text"
                    class="form-control"
                    id="add-fuel-trip-price-per-unit-textbox"
                    v-model.number="pricePerUnit"
                    name="addFuelTripPricePerUnit"
                    v-validate="`required|min_value:0`"
                >
                <b-form-invalid-feedback
                    class="d-block"
                >{{ errors.first('addFuelTripPricePerUnit') }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
                <label class="required" for="add-fuel-trip-fuel-units-textbox">Gallons</label>
                <input
                    type="text"
                    class="form-control"
                    id="add-fuel-trip-fuel-units-textbox"
                    v-model.number="fuelUnits"
                    name="addFuelTripFuelUnits"
                    v-validate="`required|min_value:0`"
                >
                <b-form-invalid-feedback class="d-block">{{ errors.first('addFuelTripFuelUnits') }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
                <label class="required" for="add-fuel-trip-distance-travelled-textbox">Miles</label>
                <input
                    type="text"
                    class="form-control"
                    id="add-fuel-trip-distance-travelled-textbox"
                    v-model.number="distanceTravelled"
                    name="addFuelTripDistanceTravelled"
                    v-validate="`required|min_value:0`"
                >
                <b-form-invalid-feedback
                    class="d-block"
                >{{ errors.first('addFuelTripDistanceTravelled') }}</b-form-invalid-feedback>
            </b-form-group>
        </form>

        <!-- Previous Button -->
        <div slot="footer">
            <!-- Create Button -->
            <b-button variant="primary" class="float-right" @click="onAddClick($event)">Add</b-button>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import ProgressTracker from '@/core/components/ux/progress-tracker.vue';
import { VehicleMixin } from '@/vehicle-system/mixins/vehicle-mixin';
import { VehicleMake } from '@/vehicle-system/entities/vehicle/vehicle-make';
import { Nullable } from '@/core/common/monads/nullable';
import AutoComplete from '@/core/components/inputs/auto-complete.vue';
import { VehicleModel } from '@/vehicle-system/entities/vehicle/vehicle-model';
import { Vehicle } from '@/vehicle-system/entities/vehicle/vehicle';
import { User } from '@/user-system/entities/user';
import { FuelTrip } from '@/vehicle-system/entities/fuel-trip';

/**
 * Popup to add a new vehicle for the user.
 */
@Component({
    name: 'add-vehicle-popup',
    components: {
        PopupContainer,
        MaterialIcon,
        ProgressTracker,
        AutoComplete,
    },
})
export default class AddVehiclePopup extends VehicleMixin {
    public $refs!: {
        popup: PopupContainer;
    };

    @Prop()
    public vehicle!: Vehicle;

    /**
     * The date of the fuel trip.
     */
    public date: Nullable<string> = null;

    /**
     * How much they paid per gallon.
     */
    public pricePerUnit: Nullable<number> = null;

    /**
     * The number of gallons.
     */
    public fuelUnits: Nullable<number> = null;

    /**
     * How far they drove.
     */
    public distanceTravelled: Nullable<number> = null;

    /**
     * Event handler for when the component is created.
     */
    public async created(): Promise<void> {
        this.$validator.localize('en', {
            custom: {
                addFuelTripDate: {
                    required: 'Date is required.',
                },
                addFuelTripPricePerUnit: {
                    required: 'Price per gallon is required.',
                    min_value: 'Price per gallon must be greater than 0.',
                },
                addFuelTripFuelUnits: {
                    required: 'Gallons is required.',
                    min_value: 'Gallons must be greater than 0.',
                },
                addFuelTripDistanceTravelled: {
                    required: 'Miles is required.',
                    min_value: 'Miles must be greater than 0.',
                },
            },
        });
    }

    /**
     * Event handler for when the user clicks the create button.
     */
    public async onAddClick(): Promise<void> {
        if (!(await this.$validator.validateAll())) {
            return;
        }

        const fuelTrip = new FuelTrip(this.vehicle.id, new Date(this.date!), this.pricePerUnit!, this.fuelUnits!, this.distanceTravelled!);
        this.$emit('add', fuelTrip);
        this.hide();
        this.$forceUpdate();
    }

    /**
     * Show the popup on screen.
     */
    public show(): void {
        this.reset();
        this.$refs.popup.show();
    }

    /**
     * Hide the popup from view.
     */
    public hide(): void {
        this.$refs.popup.hide();
    }

    /**
     * Reset the component back to defaults.
     */
    private reset(): void {
        this.date = null;
        this.pricePerUnit = null;
        this.fuelUnits = null;
        this.distanceTravelled = null;
        this.$validator.reset();
    }
}
</script>
