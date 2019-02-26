<template>
    <div style="height: 40px;">
        <!-- Button on screen -->
        <b-btn variant="success" v-b-modal.addVehicleModal style="height: 40px">
            <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
            <span style="vertical-align: middle;">Add Vehicle</span>
        </b-btn>

        <!-- Da popup -->
        <b-modal
            id="addVehicleModal"
            title="Add New Vehicle"
            ref="popup"
            @show="onShow"
            @shown="onShown"
        >
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
                <b-btn @click="onCancelButtonClick" class="mr-1">Cancel</b-btn>

                <b-btn
                    @click="onAddButtonClick"
                    variant="success"
                    class="ml-1"
                    :disabled="this.errors.all().length > 0"
                    :title="this.errors.all().length > 0 ? 'Please fix any errors first.' : 'Add a new vehicle.'"
                >
                    <material-icon icon="add" size="md"/>Add
                </b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';

/**
 * Popup to add a new vehicle.
 */
@Component({
    name: 'add-vehicle-form',
    components: {
        MaterialIcon,
    },
})
export default class AddVehicleForm extends VehicleMixin {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        yearField: HTMLInputElement;
        makeField: HTMLInputElement;
        modelField: HTMLInputElement;
        mileageField: HTMLInputElement;
        colorField: HTMLInputElement;
        licensePlateField: HTMLInputElement;
        vinField: HTMLInputElement;
        nickNameField: HTMLInputElement;
        popup: any;
    };

    public created() {
        this.$validator.localize('en', {
            custom: {
                year: {
                    required: 'Vehicle year is required.',
                },
                make: {
                    required: 'Vehicle manafacturer is required.',
                },
                model: {
                    required: 'Vehicle model is required.',
                },
                mileage: {
                    required: 'Vehicle current mileage is required.',
                },
                color: {
                    max: 'Vehicle color must be 16 characters or less.',
                },
                licensePlate: {
                    max: 'License plate number must be 10 characters or less.',
                },
                vin: {
                    max:
                        'Vehicle identification number (VIN) must be 17 characters or less.',
                },
                nickName: {
                    max: 'Vehicle nickname must be 32 characters or less.',
                },
            },
        });
    }

    /**
     * The next year from the current one.
     */
    public get maxModelYear(): number {
        return new Date().getFullYear() + 1;
    }

    /**
     * User wants to submit, and create the vehicle.
     */
    public async onAddButtonClick(): Promise<void> {
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
            Number.parseInt(rawMileage, 10)
        );

        vehicle.color = this.$refs.colorField.value;
        vehicle.licensePlate = this.$refs.licensePlateField.value;
        vehicle.vin = this.$refs.vinField.value;
        vehicle.name = this.$refs.nickNameField.value;

        await this.$vehicleStore.addVehicle(vehicle);
        this.$refs.popup.hide();
    }

    public async onCancelButtonClick(): Promise<void> {
        this.$refs.popup.hide();
    }

    /**
     * When the popup is being prepared to be shown, reset everything back to it's
     * original empty state.
     */
    public async onShow(): Promise<void> {
        this.$refs.yearField.value = '';
        this.$refs.makeField.value = '';
        this.$refs.modelField.value = '';
        this.$refs.mileageField.value = '';
        this.$refs.colorField.value = '';
        this.$refs.licensePlateField.value = '';
        this.$refs.vinField.value = '';
        this.$refs.nickNameField.value = '';

        this.$validator.reset();
    }

    /**
     * Once the popup is visible, activate the first field.
     */
    public async onShown(): Promise<void> {
        this.$refs.yearField.focus();
    }
}
</script>
