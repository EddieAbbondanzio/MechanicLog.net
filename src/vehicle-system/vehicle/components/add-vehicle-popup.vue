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
                                ref="yearTextbox"
                                id="add-vehicle-year-textbox"
                                placeholder="2009"
                                name="addVehicleYear"
                                v-validate="'required|numeric'"
                            />
                            <b-form-invalid-feedback class="d-block">{{ errors.first('addVehicleYear') }}</b-form-invalid-feedback>
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
                            <b-form-invalid-feedback class="d-block">{{ errors.first('addVehicleMake') }}</b-form-invalid-feedback>
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
                                name="addVehicleModel"
                                v-validate="'min_value:0'"
                            />
                            <b-form-invalid-feedback class="d-block">{{ errors.first('addVehicleModel') }}</b-form-invalid-feedback>
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
                            />
                        </b-form-group>

                        <!-- License Plate -->
                        <b-form-group>
                            <label for="add-vehicle-plate-textbox">License Plate</label>
                            <b-form-input
                                type="text"
                                id="add-vehicle-plate-textbox"
                                placeholder="License Plate Number"
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
                            />
                        </b-form-group>

                        <!-- Color -->
                        <b-form-group>
                            <label for="add-vehicle-color-textbox">Color</label>
                            <b-form-input
                                type="text"
                                id="add-vehicle-color-textbox"
                                placeholder="Blue"
                            />
                        </b-form-group>

                        <!-- Nickname -->
                        <b-form-group>
                            <label for="add-vehicle-name-textbox">Nickname or Label</label>
                            <b-form-input
                                type="text"
                                id="add-vehicle-name-textbox"
                                placeholder="Daily Driver"
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
                v-if="activeStep == 1"
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
        yearTextbox: HTMLInputElement;
        makeTextbox: AutoCompleteTextbox;
        modelTextbox: AutoCompleteTextbox;
    };

    /**
     * The current step the user is on.
     */
    public activeStep!: number;

    public selectedMakeId!: number;

    public selectedMake!: Nullable<VehicleMake>;

    public makes!: { value: number; text: string }[];

    public selectedModelId!: number;

    public selectedModel!: Nullable<VehicleModel>;

    public models!: { value: number; text: string }[];

    /**
     * Event handler for when the component is created.
     */
    public async created(): Promise<void> {
        this.activeStep = 0;

        this.selectedMake = null;
        this.selectedMakeId = -1;

        this.selectedModel = null;
        this.selectedModelId = -1;

        this.makes = [];
        this.models = [];

        const makes = await this.$vehicleMakeStore.getMakes();

        if (makes.isLeft()) {
            this.makes = makes.getLeft().map((m) => ({ value: m.id, text: m.name }));
        }

        this.$validator.localize('en', {
            custom: {
                'addVehicleYear': {
                    'required': 'Vehicle year is required.',
                },
                'addVehicleMake': {
                    'required': 'Vehicle make is required.',
                    'min_value': 'Vehicle make must be from the provided list.',
                },
                'addVehicleModel': {
                    'required': 'Vehicle model is required.',
                    'min_value': 'Vehicle model must be from the provided list.',
                },
            },
        });
    }

    /**
     * Event handler for after the user leaves the make box.
     */
    public async onMakeBlur(): Promise<void> {
        if (this.selectedMakeId === -1) {
            return;
        }

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

        this.selectedModel = null;
        this.selectedModelId = -1;
        this.$refs.modelTextbox.clear();
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user cicks a tab.
     */
    public async onTabClick(): Promise<void> {
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user clicks the previous button.
     */
    public async onPreviousClick(): Promise<void> {
        alert('prev');
    }

    /**
     * Event handler for when the user clicks the next button.
     */
    public async onNextClick(): Promise<void> {
        await this.validateTab(0);
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user clicks the create button.
     */
    public async onAddClick(): Promise<void> {
        alert('add');
    }

    /**
     * Show the popup on screen.
     */
    public show(): void {
        this.selectedMakeId = -1;
        this.selectedMake = null;
        this.selectedModelId = -1;
        this.selectedModel = null;
        this.$refs.makeTextbox.clear();
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
                return (await Promise.all([
                    this.$validator.validate('addVehicleYear'),
                    this.$validator.validate('addVehicleMake'),
                    this.$validator.validate('addVehicleModel'),
                ])).every((v) => v);

            default:
                throw new Error(`Tab index ${index} is invalid.`);
        }
    }
}
</script>
