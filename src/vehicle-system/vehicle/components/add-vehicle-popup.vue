<template>
    <popup-container
        id="addVehicle"
        ref="popup"
        title="Add New Vehicle"
        size="lg"
        headerColor="primary"
    >
        <form ref="form">
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
                                v-validate="'required|numeric'"
                            >
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('addVehicleYear') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Make -->
                        <b-form-group>
                            <label class="required" for="add-vehicle-make-textbox">Make</label>
                            <auto-complete-textbox
                                :options="makes"
                                ref="makeTextbox"
                                v-model="selectedMakeId"
                                placeholder="Honda"
                                @blur="onMakeBlur"
                                name="addVehicleMake"
                                v-validate="'min_value:0'"
                            />
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('addVehicleMake') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Model -->
                        <b-form-group>
                            <label class="required" for="add-vehicle-model-textbox">Model</label>
                            <auto-complete-textbox
                                :options="models"
                                ref="modelTextbox"
                                v-model="selectedModelId"
                                placeholder="Civic"
                                :disabled="selectedMake == null"
                                @blur="onModelBlur"
                                name="addVehicleModel"
                                v-validate="'min_value:0'"
                            />
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('addVehicleModel') }}</b-form-invalid-feedback>
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
                                v-validate="'max:17'"
                            />
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
                                v-validate="'max:10'"
                            />
                        </b-form-group>
                    </b-tab>

                    <!-- Details -->
                    <b-tab title="Details" class="py-4" @click="onTabClick">
                        <!-- Current Mileage -->
                        <b-form-group>
                            <label for="add-vehicle-mileage-textbox">Current Mileage</label>
                            <b-form-input
                                type="text"
                                id="add-vehicle-mileage-textbox"
                                placeholder="49200"
                                v-model.number="mileage"
                                name="addVehicleMileage"
                                v-validate="'numeric'"
                            />
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
                                v-validate="'max:16'"
                            />
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
                                v-validate="'max:32'"
                            />
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
            <b-button
                variant="primary"
                class="float-right"
                @click="onAddClick($event)"
                v-else
            >Create</b-button>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import ProgressTracker from '@/core/components/multi-step/progress-tracker.vue';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import { VehicleMake } from '@/vehicle-system/vehicle/entities/vehicle-make';
import { Nullable } from '@/core/common/monads/nullable';
import AutoCompleteTextbox from '@/core/components/inputs/auto-complete-textbox.vue';
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
        AutoCompleteTextbox,
    },
})
export default class AddVehiclePopup extends VehicleMixin {
    public $refs!: {
        popup: PopupContainer;
        form: HTMLFormElement;
        makeTextbox: AutoCompleteTextbox;
        modelTextbox: AutoCompleteTextbox;
    };

    /**
     * The current step the user is on.
     */
    public activeStep!: number;

    /**
     * Cached value of the previous step so we can validate
     * after a user has left a page.
     */
    public lastStep!: number;

    public selectedMakeId!: number;

    public selectedMake!: Nullable<VehicleMake>;

    public makes!: { value: number; text: string }[];

    public selectedModelId!: number;

    public selectedModel!: Nullable<VehicleModel>;

    public models!: { value: number; text: string }[];

    public year!: Nullable<number>;

    public vin!: Nullable<string>;

    public plate!: Nullable<string>;

    public color!: Nullable<string>;

    public name!: Nullable<string>;

    public mileage!: Nullable<number>;

    /**
     * Event handler for when the component is created.
     */
    public async created(): Promise<void> {
        this.activeStep = 0;
        this.lastStep = 0;

        this.selectedMake = null;
        this.selectedMakeId = -1;

        this.selectedModel = null;
        this.selectedModelId = -1;

        this.makes = [];
        this.models = [];

        this.year = null;
        this.vin = null;
        this.plate = null;
        this.color = null;
        this.name = null;
        this.mileage = null;

        const makes = await this.$vehicleMakeStore.getMakes();

        if (makes.isLeft()) {
            this.makes = makes.getLeft().map((m) => ({ value: m.id, text: m.name }));
        }

        this.$validator.localize('en', {
            custom: {
                addVehicleYear: {
                    required: 'Vehicle year is required.',
                },
                addVehicleMake: {
                    required: 'Vehicle make is required.',
                    min_value: 'Vehicle make must be from the provided list.',
                },
                addVehicleModel: {
                    required: 'Vehicle model is required.',
                    min_value: 'Vehicle model must be from the provided list.',
                },
            },
        });
    }

    /**
     * Event handler for after the user leaves the make box.
     */
    public async onMakeBlur(): Promise<void> {
        if (this.selectedMakeId !== -1) {
            const allMakes = await this.$vehicleMakeStore.getMakes();

            if (allMakes.isLeft()) {
                const match = allMakes.getLeft().find((make) => make.id === this.selectedMakeId);

                if (match != null) {
                    this.selectedMake = match;

                    // Pull in the models
                    const allModels = await this.$vehicleModelStore.getModelsForMake(match);

                    if (allModels.isLeft()) {
                        this.models = allModels.getLeft().map((model) => ({ value: model.id, text: model.name }));
                    }
                }
            }
        }

        const that: AddVehiclePopup = this;

        setTimeout(function() {
            if (that.errors.first('addVehicleMake') != null) {
                that.$refs.makeTextbox.invalid();
            } else {
                that.$refs.makeTextbox.valid();
            }
        }, 100);

        this.selectedModel = null;
        this.selectedModelId = -1;
        this.$refs.modelTextbox.clear();
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user leaves the model field.
     */
    public async onModelBlur(): Promise<void> {
        if (this.selectedModelId !== -1) {
            const allModels = await this.$vehicleModelStore.getModelsForMake(this.selectedMake!);

            if (allModels.isLeft()) {
                const match = allModels.getLeft().find((model) => model.id === this.selectedModelId);

                if (match != null) {
                    this.selectedModel = match;
                } else {
                    this.selectedModel = null;
                }
            }
        }

        const that: AddVehiclePopup = this;

        setTimeout(function() {
            if (that.errors.first('addVehicleModel') != null) {
                that.$refs.modelTextbox.invalid();
            } else {
                that.$refs.modelTextbox.valid();
            }
        }, 100);
    }

    /**
     * Event handler for when the user cicks a tab.
     */
    public async onTabClick(): Promise<void> {
        if (!(await this.validateTab(this.lastStep))) {
            this.activeStep = this.lastStep;
            this.$forceUpdate();
        }

        // Gotta cache last tab somehow. $event is coming in undefined...
        this.lastStep = this.activeStep;
    }

    /**
     * Event handler for when the user clicks the previous button.
     */
    public async onPreviousClick(): Promise<void> {
        if (await this.validateTab(this.activeStep)) {
            this.activeStep--;
        }

        this.$forceUpdate();
    }

    /**
     * Event handler for when the user clicks the next button.
     */
    public async onNextClick(): Promise<void> {
        if (await this.validateTab(this.activeStep)) {
            this.activeStep++;
        }
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user clicks the create button.
     */
    public async onAddClick(): Promise<void> {
        const vehicle: Vehicle = Vehicle.fromInput({
            year: this.year,
            make: this.selectedMake!,
            model: this.selectedModel!,
            vin: this.vin,
            licensePlate: this.plate,
            color: this.color,
            name: this.name,
            mileage: this.mileage,
        });

        this.$emit('add', vehicle);
        this.hide();
        this.$forceUpdate();
    }

    /**
     * Show the popup on screen.
     */
    public show(): void {
        this.activeStep = 0;
        this.lastStep = 0;
        this.selectedMakeId = -1;
        this.selectedMake = null;
        this.selectedModelId = -1;
        this.selectedModel = null;
        this.year = null;
        this.vin = null;
        this.plate = null;
        this.color = null;
        this.name = null;
        this.mileage = null;

        this.$refs.makeTextbox.clear();
        this.$refs.modelTextbox.clear();
        this.$validator.reset();
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
     * Validate the current step.
     */
    public async validateTab(index: number): Promise<boolean> {
        switch (index) {
            case 0:
                const yearValid = await this.$validator.validate('addVehicleYear');
                const makeValid = await this.$validator.validate('addVehicleMake');
                const modelValid = await this.$validator.validate('addVehicleModel');

                if (!makeValid) {
                    this.$refs.makeTextbox.invalid();
                } else {
                    this.$refs.makeTextbox.valid();
                }

                if (!modelValid) {
                    this.$refs.modelTextbox.invalid();
                } else {
                    this.$refs.modelTextbox.valid();
                }

                return yearValid && makeValid && modelValid;

            case 1:
                return (await Promise.all([this.$validator.validate('addVehicleVin'), this.$validator.validate('addVehiclePlate')])).every((v) => v);

            case 2:
                return (await Promise.all([
                    this.$validator.validate('addVehicleMileage'),
                    this.$validator.validate('addVehicleColor'),
                    this.$validator.validate('addVehicleName'),
                ])).every((v) => v);

            default:
                throw new Error(`Tab index ${index} is invalid.`);
        }
    }
}
</script>
