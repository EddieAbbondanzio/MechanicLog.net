<template>
    <b-modal title="Edit Vehicle" ref="popup">
        <form>
            <!-- Model Year Textbox -->
            <div class="form-group">
                <label class="required" for="year-textbox">Year</label>
                <input
                    type="text"
                    class="form-control"
                    id="year-textbox"
                    placeholder="2005"
                    ref="yearField"
                    name="year"
                    v-validate="'required|integer|min_value:1900|max_value:' + maxModelYear"
                >
                <b-form-invalid-feedback>{{ errors.first('year') }}</b-form-invalid-feedback>
            </div>

            <!-- Make Textbox -->
            <div class="form-group">
                <label class="required" for="make-textbox">Make</label>
                <input
                    type="text"
                    class="form-control"
                    id="make-textbox"
                    placeholder="Honda"
                    ref="makeField"
                    name="make"
                    v-validate="'required|max:32'"
                >
                <b-form-invalid-feedback>{{ errors.first('make') }}</b-form-invalid-feedback>
            </div>

            <!-- Model Textbox -->
            <div class="form-group">
                <label class="required" for="model-textbox">Model</label>
                <input
                    type="text"
                    class="form-control"
                    id="model-textbox"
                    placeholder="Civic"
                    ref="modelField"
                    name="model"
                    v-validate="'required|max:32'"
                >
                <b-form-invalid-feedback>{{ errors.first('model') }}</b-form-invalid-feedback>
            </div>

            <!-- Mileage Textbox-->
            <div class="form-group">
                <label class="required" for="mileage-textbox">Mileage</label>
                <input
                    type="text"
                    class="form-control"
                    id="mileage-textbox"
                    placeholder="123000"
                    ref="mileageField"
                    name="mileage"
                    v-validate="'required|integer|min_value:0'"
                >
                <b-form-invalid-feedback>{{ errors.first('mileage') }}</b-form-invalid-feedback>
            </div>

            <!-- Color Textbox-->
            <div class="form-group">
                <label for="color-textbox">Color</label>
                <input
                    type="text"
                    class="form-control"
                    id="color-textbox"
                    placeholder="Red"
                    ref="colorField"
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
                    ref="licensePlateField"
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
                    ref="vinField"
                    name="vin"
                    v-validate="'max:17'"
                >
                <b-form-invalid-feedback>{{ errors.first('vin') }}</b-form-invalid-feedback>
            </div>

            <!-- NickName Textbox -->
            <div class="form-group">
                <label for="name-textbox">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name-textbox"
                    placeholder="Daily Driver"
                    ref="nickNameField"
                    name="nickName"
                    v-validate="'max:32'"
                >
                <b-form-invalid-feedback>{{ errors.first('nickName') }}</b-form-invalid-feedback>
                <small>A nickname can be used to help identify vehicles easier.</small>
            </div>
        </form>
        <div slot="modal-footer">
            <b-btn variant="muted" class="mr-2" @click="onCancelButton">Cancel</b-btn>
            <b-btn variant="success" class="ml-2" @click="onConfirmButton">Confirm</b-btn>
        </div>
    </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VehicleMixin } from '@/garage/mixins/vehicle-mixin';
import { Modal } from 'bootstrap-vue';
import { Vehicle } from '@/garage/entities/vehicle';

/**
 * Popup to edit the details of a vehicle.
 */
@Component({
    name: 'edit-vehicle-popup',
})
export default class EditVehiclePopup extends VehicleMixin {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        yearField: HTMLInputElement,
        makeField: HTMLInputElement,
        modelField: HTMLInputElement,
        mileageField: HTMLInputElement,
        colorField: HTMLInputElement,
        licensePlateField: HTMLInputElement,
        vinField: HTMLInputElement,
        nickNameField: HTMLInputElement,
        popup: any,
    };

    /**
     * The vehicle to edit.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The next year from the current one.
     */
    public get maxModelYear(): number {
        return new Date().getFullYear() + 1;
    }

    /**
     * Show the popup on the screen.
     */
    public show(): void {
        (this.$refs.popup as Modal).show();

        // Populate the fields
        this.$refs.yearField.value = this.vehicle.year.toString();
        this.$refs.makeField.value = this.vehicle.make;
        this.$refs.modelField.value = this.vehicle.model;
        this.$refs.mileageField.value = this.vehicle.mileage.toString();
        this.$refs.colorField.value = this.vehicle.color || '';
        this.$refs.licensePlateField.value = this.vehicle.licensePlate || '';
        this.$refs.vinField.value = this.vehicle.vin || '';
        this.$refs.nickNameField.value = this.vehicle.name || '';
    }

    /**
     * Hide the popup from the screen.
     */
    public hide(): void {
        (this.$refs.popup as Modal).hide();
    }

    /**
     * On cancel click. Hide the popup.
     */
    protected async onCancelButton(): Promise<void> {
        this.hide();
    }

    /**
     * On confirm click. Apply the changes.
     */
    protected async onConfirmButton(): Promise<void> {
        // Validate it, before we send it off to the back end.
        if (!(await this.$validator.validate())) {
            return;
        }

        const rawYear: string = this.$refs.yearField.value;
        const rawMake: string = this.$refs.makeField.value;
        const rawModel: string = this.$refs.modelField.value;
        const rawMileage: string = this.$refs.mileageField.value;

        const vehicle: Vehicle = new Vehicle(
            Number.parseInt(rawYear, 10),
            rawMake,
            rawModel,
            Number.parseInt(rawMileage, 10),
        );

        // tslint:disable
        vehicle.id = this.vehicle.id;
        vehicle.color = this.$refs.colorField.value === '' ? undefined : this.$refs.colorField.value;
        vehicle.licensePlate = this.$refs.licensePlateField.value === '' ? undefined : this.$refs.licensePlateField.value;
        vehicle.vin = this.$refs.vinField.value === '' ? undefined : this.$refs.vinField.value;
        vehicle.name = this.$refs.nickNameField.value === '' ? undefined : this.$refs.nickNameField.value;
        // tslint:enable

        this.$emit('edit', vehicle);
        this.$refs.popup.hide();
    }
}
</script>