<template>
    <popup-container
        id="addVehicle"
        ref="popup"
        title="Add New Vehicle"
        size="lg"
        headerColor="primary"
    >
        <form>
            <b-card no-body border-variant="white">
                <b-tabs v-model="activeStep">
                    <!-- Model Information -->
                    <b-tab title="Vehicle Model" class="py-4" @click="onTabClick">
                        <!-- Model Year -->
                        <b-form-group>
                            <label class="required" for="add-vehicle-year-textbox">Year</label>
                            <input
                                type="text"
                                class="form-control"
                                id="add-vehicle-year-textbox"
                                placeholder="2009"
                                v-model.number="year"
                                name="addVehicleYear"
                                data-vv-scope="tab1"
                                v-validate="`required|numeric|min_value:${VEHICLE_MIN_MODEL_YEAR}|max_value:${VEHICLE_MAX_MODEL_YEAR}`"
                            >
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab1.addVehicleYear') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Make -->
                        <b-form-group>
                            <label class="required" for="add-vehicle-make-textbox">Make</label>
                            <auto-complete
                                :options="makes"
                                v-model="make"
                                placeholder="Honda"
                                @blur="onMakeBlur"
                                name="addVehicleMake"
                                data-vv-scope="tab1"
                                v-validate="'required'"
                            />
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab1.addVehicleMake') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Model -->
                        <b-form-group>
                            <label class="required" for="add-vehicle-model-textbox">Model</label>
                            <auto-complete
                                :options="models"
                                v-model="model"
                                placeholder="Civic"
                                :disabled="make == null"
                                name="addVehicleModel"
                                data-vv-scope="tab1"
                                v-validate="'required'"
                            />
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab1.addVehicleModel') }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-tab>

                    <!-- Registration -->
                    <b-tab title="Registration" class="py-4" @click="onTabClick">
                        <!-- VIN -->
                        <b-form-group>
                            <label for="add-vehicle-vin-textbox">VIN</label>
                            <b-form-input
                                type="text"
                                id="add-vehicle-vin-textbox"
                                placeholder="VIN or Serial Number"
                                v-model="vin"
                                name="addVehicleVin"
                                data-vv-scope="tab2"
                                v-validate="`max:${VEHICLE_VIN_MAX_LENGTH}`"
                            />
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab2.addVehicleVin') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- License Plate -->
                        <b-form-group>
                            <label for="add-vehicle-plate-textbox">License Plate</label>
                            <b-form-input
                                type="text"
                                id="add-vehicle-plate-textbox"
                                placeholder="License Plate Number"
                                v-model="plate"
                                name="addVehiclePlate"
                                data-vv-scope="tab2"
                                v-validate="`max:${VEHICLE_LICENSE_PLATE_MAX_LENGTH}`"
                            />
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab2.addVehiclePlate') }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-tab>

                    <!-- Details -->
                    <b-tab title="Details" class="py-4" @click="onTabClick">
                        <!-- Current Mileage -->
                        <b-form-group>
                            <label
                                for="add-vehicle-mileage-textbox"
                                class="required"
                            >Current Mileage</label>
                            <b-form-input
                                type="text"
                                id="add-vehicle-mileage-textbox"
                                placeholder="49200"
                                v-model.number="mileage"
                                name="addVehicleMileage"
                                data-vv-scope="tab3"
                                v-validate="'required|integer|min_value:0'"
                            />
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab3.addVehicleMileage') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Color -->
                        <b-form-group>
                            <label for="add-vehicle-color-textbox">Color</label>
                            <b-form-input
                                type="text"
                                id="add-vehicle-color-textbox"
                                placeholder="Blue"
                                v-model="color"
                                name="addVehicleColor"
                                data-vv-scope="tab3"
                                v-validate="'max:16'"
                            />
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab3.addVehicleColor') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Nickname -->
                        <b-form-group>
                            <label for="add-vehicle-name-textbox">Nickname or Label</label>
                            <b-form-input
                                type="text"
                                id="add-vehicle-name-textbox"
                                placeholder="Daily Driver"
                                v-model="name"
                                name="addVehicleName"
                                data-vv-scope="tab3"
                                v-validate="'max:32'"
                            />
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab3.addVehicleName') }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-tab>
                </b-tabs>
            </b-card>
        </form>

        <hr>

        <progress-tracker :current="activeStep + 1" :max="3"/>

        <!-- Previous Button -->
        <div slot="footer">
            <b-button
                variant="success"
                class="float-left"
                @click="onPreviousClick"
                v-if="activeStep > 0"
            >Previous</b-button>

            <!-- Next Button -->
            <b-button
                variant="success"
                class="float-right"
                @click="onNextClick"
                v-if="activeStep < 2"
            >Next</b-button>

            <!-- Create Button -->
            <b-button variant="primary" class="float-right" @click="onAddClick($event)" v-else>Add</b-button>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import ProgressTracker from '@/core/components/ux/progress-tracker.vue';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import { VehicleMake } from '@/vehicle-system/vehicle/entities/vehicle-make';
import { Nullable } from '@/core/common/monads/nullable';
import AutoComplete from '@/core/components/inputs/auto-complete.vue';
import { VehicleModel } from '@/vehicle-system/vehicle/entities/vehicle-model';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';

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

    public VEHICLE_MAX_MODEL_YEAR: number = Vehicle.MAX_MODEL_YEAR;
    public VEHICLE_MIN_MODEL_YEAR: number = Vehicle.MIN_MODEL_YEAR;
    public VEHICLE_VIN_MAX_LENGTH = Vehicle.MAX_VIN_LENGTH;
    public VEHICLE_LICENSE_PLATE_MAX_LENGTH = Vehicle.MAX_LICENSE_PLATE_LENGTH;

    /**
     * The current step the user is on.
     */
    public activeStep: number = 0;

    /**
     * Cached value of the previous step so we can validate
     * after a user has left a page.
     */
    public lastStep: number = 0;

    /**
     * The available makes
     */
    public makes: string[] = [];

    /**
     * The available models.
     */
    public models: string[] = [];

    /**
     * The model year of the vehicle.
     */
    public year: Nullable<number> = null;

    /**
     * The name of the make of the vehicle.
     */
    public make: Nullable<string> = null;

    /**
     * The name of the model of the vehicle.
     */
    public model: Nullable<string> = null;

    /**
     * The Vehicle Identification Number of the vehicle.
     */
    public vin: Nullable<string> = null;

    /**
     * The license plate number.
     */
    public plate: Nullable<string> = null;

    /**
     * The current mileage.
     */
    public mileage: Nullable<number> = null;

    /**
     * The paint color of the vehicle.
     */
    public color: Nullable<string> = null;

    /**
     * The name of the vehicle.
     */
    public name: Nullable<string> = null;

    /**
     * Event handler for when the component is created.
     */
    public async created(): Promise<void> {
        this.$validator.localize('en', {
            custom: {
                addVehicleYear: {
                    required: 'Vehicle year is required.',
                    min_value: `Vehicle year must be greater than ${Vehicle.MIN_MODEL_YEAR}.`,
                    max_value: `Vehicle year must be less than ${Vehicle.MAX_MODEL_YEAR}.`,
                },
                addVehicleMake: {
                    required: 'Vehicle make is required.',
                    min_value: 'Vehicle make must be from the provided list.',
                },
                addVehicleModel: {
                    required: 'Vehicle model is required.',
                    min_value: 'Vehicle model must be from the provided list.',
                },
                addVehicleMileage: {
                    required: 'Vehicle mileage is required.',
                    integer: 'Vehicle mileage must be an integer',
                    min_value: 'Vehicle mileage must be greater than 0.',
                },
                addVehicleVin: {
                    max: 'Vehicle Identification Number must be 17 characters or less.' 
                },
                addVehiclePlate: {
                    max: 'License plate number must be 10 characters or less.'
                }
            },
        });

        // Pull in the makes from the database
        this.makes = await (await this.$vehicleMakeStore.getMakes()).do(
            async (makes) => {
                return makes.map((m) => m.name);
            },
            async (error) => {
                return [];
            }
        );
    }

    /**
     * Event handler for after the user leaves the make field.
     */
    public async onMakeBlur(): Promise<void> {
        // Pull in the models
        if (this.make != null) {
            const makeCode = (await this.$vehicleMakeStore.getMakes()).getLeft().find((m) => m.name === this.make);

            // User never selected anything.
            if (makeCode == null) {
                return;
            }

            this.models = await (await this.$vehicleModelStore.getModelsForMake(makeCode)).do(
                async (models) => {
                    return models.map((m) => m.name);
                },
                async (error) => {
                    return [];
                }
            );
        }

        this.model = null;
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user cicks a tab.
     */
    public async onTabClick(): Promise<void> {
        if (await this.$validator.validateAll(`tab${this.lastStep + 1}`)) {
            // Gotta cache last tab somehow. $event is coming in undefined...
            this.lastStep = this.activeStep;
        } else {
            this.activeStep = this.lastStep;
        }
    }

    /**
     * Event handler for when the user clicks the previous button.
     */
    public async onPreviousClick(): Promise<void> {
        if (await this.$validator.validateAll(`tab${this.activeStep + 1}`)) {
            this.activeStep--;
        }
    }

    /**
     * Event handler for when the user clicks the next button.
     */
    public async onNextClick(): Promise<void> {
        if (await this.$validator.validateAll(`tab${this.activeStep + 1}`)) {
            this.activeStep++;
        }
    }

    /**
     * Event handler for when the user clicks the create button.
     */
    public async onAddClick(): Promise<void> {
        if (!(await this.$validator.validateAll(`tab${this.activeStep + 1}`))) {
            return;
        }

        const make = (await this.$vehicleMakeStore.getMakes()).getLeft().find((m) => m.name === this.make)!;
        const model = (await this.$vehicleModelStore.getModelsForMake(make)).getLeft().find((m) => m.name === this.model)!;

        const vehicle = Vehicle.fromInput({
            year: this.year,
            make,
            model,
            mileage: this.mileage,
            name: this.name,
            color: this.color,
            licensePlate: this.plate,
            vin: this.vin,
        });

        this.$emit('add', vehicle);
        this.hide();
        this.$forceUpdate();
    }

    /**
     * Show the popup on screen.
     */
    public show(): void {
        this.reset();

        this.$refs.popup.show();
        this.$forceUpdate();
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
        this.activeStep = 0;
        this.lastStep = 0;

        this.models = [];

        this.year = null;
        this.make = null;
        this.model = null;
        this.vin = null;
        this.plate = null;
        this.mileage = null;
        this.color = null;
        this.name = null;

        this.$validator.reset();
    }
}
</script>
