<template>
    <popup-container
        id="addVehicle"
        ref="popup"
        title="Edit Vehicle Details"
        size="lg"
        headerColor="primary"
    >
        <form>
            <!-- Mileage Textbox-->
            <div class="form-group">
                <label class="required" for="odometer-textbox">Odometer</label>
                <input
                    type="text"
                    class="form-control"
                    id="odometer-textbox"
                    placeholder="123000"
                    v-model.number="odometer"
                    name="odometer"
                    v-validate="'required|integer|min_value:0'"
                >
                <b-form-invalid-feedback>{{ errors.first('odometer') }}</b-form-invalid-feedback>
            </div>

            <!-- Color Textbox-->
            <div class="form-group">
                <label for="color-textbox">Color</label>
                <input
                    type="text"
                    class="form-control"
                    id="color-textbox"
                    placeholder="Red"
                    v-model="color"
                    name="color"
                    v-validate="'max:16'"
                >
                <b-form-invalid-feedback>{{ errors.first('color') }}</b-form-invalid-feedback>
            </div>

            <!-- License Plate Textbox-->
            <div class="form-group">
                <label for="license-plate-textbox">License Plate</label>
                <input
                    type="text"
                    class="form-control"
                    id="license-plate-textbox"
                    placeholder="3232 XJ"
                    v-model="licensePlate"
                    name="licensePlate"
                    v-validate="'max:10'"
                >
                <b-form-invalid-feedback>{{ errors.first('licensePlate') }}</b-form-invalid-feedback>
            </div>

            <!-- Vin Textbox-->
            <div class="form-group">
                <label for="vin-textbox">VIN</label>
                <input
                    type="text"
                    class="form-control"
                    id="vin-textbox"
                    placeholder="1FTFW1EF1BFC16841"
                    v-model="vin"
                    name="vin"
                    v-validate="'max:17'"
                >
                <b-form-invalid-feedback>{{ errors.first('vin') }}</b-form-invalid-feedback>
            </div>

            <!-- NickName Textbox -->
            <div class="form-group">
                <label class="required" for="name-textbox">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name-textbox"
                    placeholder="Daily Driver"
                    v-model="name"
                    name="nickName"
                    v-validate="'required|max:32'"
                >
                <b-form-invalid-feedback>{{ errors.first('nickName') }}</b-form-invalid-feedback>
                <small>A nickname can be used to help identify vehicles easier.</small>
            </div>
        </form>

        <div slot="footer">
            <b-button variant="warning" class="float-left" @click="onCancelClick">Cancel</b-button>

            <!-- Create Button -->
            <b-button variant="primary" class="float-right" @click="onConfirmClick">Confirm</b-button>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VehicleMixin } from '@/vehicle-system/mixins/vehicle-mixin';
import { Modal } from 'bootstrap-vue';
import { Vehicle } from '@/vehicle-system/entities/vehicle/vehicle';
import { VehicleMake } from '@/vehicle-system/entities/vehicle/vehicle-make';
import { VehicleModel } from '@/vehicle-system/entities/vehicle/vehicle-model';
import { Nullable } from '@/core/common/monads/nullable';
import PopupContainer from '@/core/components/popup/popup-container.vue';

/**
 * Popup to edit the details of a vehicle.
 */
@Component({
    name: 'edit-vehicle-popup',
    components: {
        PopupContainer,
    },
})
export default class EditVehiclePopup extends Vue {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        popup: PopupContainer;
    };

    /**
     * The vehicle to edit.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The name of the vehicle.
     */
    public name: Nullable<string> = null;

    /**
     * The current mileage of the vehicle.
     */
    public odometer: Nullable<number> = null;

    /**
     * The paint color of the vehicle.
     */
    public color: Nullable<string> = null;

    /**
     * The license plate of the vehicle.
     */
    public licensePlate: Nullable<string> = null;

    /**
     * The new vin of the vehicle.
     */
    public vin: Nullable<string> = null;

    /**
     * Show the popup on the screen.
     */
    public show(): void {
        this.name = this.vehicle.name;
        this.color = this.vehicle.color;
        this.licensePlate = this.vehicle.licensePlate;
        this.vin = this.vehicle.vin;
        this.name = this.vehicle.name;
        this.odometer = this.vehicle.odometer;

        this.$refs.popup.show();
    }

    /**
     * Hide the popup from the screen.
     */
    public hide(): void {
        this.$refs.popup.hide();
    }

    /**
     * On cancel click. Hide the popup.
     */
    protected async onCancelClick(): Promise<void> {
        this.hide();
    }

    /**
     * On confirm click. Apply the changes.
     */
    protected async onConfirmClick(): Promise<void> {
        // Validate it, before we send it off to the back end.
        if (!(await this.$validator.validate())) {
            return;
        }

        const vehicle: Vehicle = new Vehicle(this.vehicle.year, this.vehicle.make, this.vehicle.model, this.odometer || 0, this.vehicle.transmissionType);

        vehicle.id = this.vehicle.id;
        vehicle.name = this.name;
        vehicle.color = this.color;
        vehicle.licensePlate = this.licensePlate;
        vehicle.vin = this.vin;

        this.$emit('edit', vehicle);
        this.$refs.popup.hide();
    }
}
</script>