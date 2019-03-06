<style lang="scss" scoped>
.service-list-header {
    padding-bottom: 0.5em;
}

.service-list {
    height: 315px;
    overflow-y: scroll;
}
</style>

<template>
    <popup-container id="addMaintenance" ref="popup" title="Add Maintenance" size="lg">
        <form>
            <b-card no-body border-variant="white">
                <b-tabs v-model="activeStep">
                    <!-- Mechanic Who Performed It-->
                    <b-tab title="Mechanic" class="py-4" @click="onTabClick">
                        <b-form-group>
                            <label class="required" for="add-mechanic-select">Mechanic</label>
                            <b-form-select
                                id="add-mechanic-select"
                                v-model="selectedMechanicIndex"
                                name="addMaintenanceMechanic"
                                data-vv-scope="tab1"
                                v-validate="'required|min_value:0'"
                            >
                                <option :value="-1" disabled>Who performed the work?</option>
                                <option
                                    v-for="mechanic in mechanics"
                                    v-bind:key="mechanic.id"
                                    :value="mechanic.id"
                                >{{ mechanic.name }}</option>
                            </b-form-select>

                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab1.addMaintenanceMechanic') }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-tab>

                    <!-- Date of Maintennace -->
                    <b-tab title="Date" class="py-4" @click="onTabClick">
                        <b-form-group>
                            <label class="required" for="mileage-textbox">Mileage</label>
                            <input
                                type="text"
                                class="form-control"
                                id="mileage-textbox"
                                placeholder="123000"
                                v-model.number="mileage"
                                data-vv-scope="tab2"
                                name="addMaintenanceMileage"
                                v-validate="'required|integer|min_value:1'"
                            >
                            <b-form-invalid-feedback>{{ errors.first('tab2.addMaintenanceMileage') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- Name Textbox -->
                        <b-form-group>
                            <label class="required" for="date-textbox">Date</label>
                            <input
                                type="date"
                                class="form-control"
                                id="date-textbox"
                                v-model="date"
                                data-vv-scope="tab2"
                                name="addMaintenanceDate"
                                v-validate="'required'"
                            >
                            <b-form-invalid-feedback>{{ errors.first('tab2.addMaintenanceDate') }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-tab>

                    <!-- Services Performed -->
                    <b-tab title="Services" class="py-4" @click="onTabClick">
                        <div style="height: 360px;">
                            <div class="w-50 d-inline-block h-100 pr-2">
                                <div class="service-list-header">
                                    <h5>Available</h5>
                                    <hr class="mb-1 mt-0">
                                </div>

                                <b-list-group class="service-list">
                                    <b-list-group-item
                                        class="service-list-item"
                                        v-for="(service, index) in availableServices"
                                        v-bind:key="service"
                                        @click="onAvailableServiceClick(index)"
                                        href="#"
                                    >
                                        <div>
                                            <material-icon
                                                icon="add"
                                                size="md"
                                                color="success"
                                                class="align-middle pr-1"
                                            />
                                            <span style="overflow-x: hidden;">{{ service }}</span>
                                        </div>
                                    </b-list-group-item>
                                </b-list-group>
                            </div>

                            <div class="w-50 d-inline-block h-100 pl-2">
                                <div class="service-list-header">
                                    <h5>Selected</h5>
                                    <hr class="mb-1 mt-0">
                                </div>

                                <b-list-group class="service-list">
                                    <b-list-group-item
                                        class="service-list-item"
                                        v-for="(service, index) in selectedServices"
                                        v-bind:key="service"
                                        @click="onSelectedServiceClick(index)"
                                        href="#"
                                    >
                                        <div>
                                            <material-icon
                                                icon="remove"
                                                size="md"
                                                color="danger"
                                                class="align-middle pr-1"
                                            />
                                            <span style="overflow-x: hidden;">{{ service }}</span>
                                        </div>
                                    </b-list-group-item>
                                </b-list-group>
                            </div>
                            <span
                                class="text-danger"
                                v-if="selectedServices.length == 0"
                            >At least one service must be selected</span>
                        </div>
                    </b-tab>

                    <!-- Cost -->
                    <b-tab title="Cost" class="py-4" @click="onTabClick">
                        <b-form-group>
                            <label class="required" for="add-total-cost-textbox">Total Cost</label>
                            <input
                                type="text"
                                class="form-control"
                                id="add-total-cost-textbox"
                                placeholder="499.99"
                                v-model.number="cost"
                                data-vv-scope="tab4"
                                name="addMaintenanceCost"
                                v-validate="'required|decimal:2'"
                            >
                            <b-form-invalid-feedback>{{ errors.first('tab4.addMaintenanceCost') }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-tab>
                </b-tabs>
            </b-card>
        </form>

        <hr>

        <progress-tracker :current="activeStep + 1" :max="4"/>

        <!-- Previous Button -->
        <div slot="footer">
            <b-button variant="success" class="float-left" v-if="activeStep > 0">Previous</b-button>

            <!-- Next Button -->
            <b-button
                variant="success"
                class="float-right"
                @click="onNextClick"
                v-if="activeStep < 3"
            >Next</b-button>

            <!-- Create Button -->
            <b-button variant="primary" class="float-right" v-else @click="onAddClick">Add</b-button>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { MechanicMixin } from '@/vehicle-system/mechanic/mechanic-mixin';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import { Popup } from '@/core/components/interfaces/popup';
import ProgressTracker from '@/core/components/ux/progress-tracker.vue';
import { Nullable } from '@/core/common/monads/nullable';
import { MaintenanceEvent } from '@/vehicle-system/vehicle/entities/maintenance-event';
import { MaintenanceService } from '@/vehicle-system/vehicle/entities/maintenance-service';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';

/**
 * Popup form to add a new maintenance even.
 */
@Component({
    name: 'add-maintenance-popup',
    components: {
        MaterialIcon,
        PopupContainer,
        ProgressTracker,
    },
})
export default class AddMaintenancePopup extends MechanicMixin implements Popup {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        popup: PopupContainer;
    };

    /**
     * The vehicle being worked on.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The active step the user is on.
     */
    private activeStep: number = 0;

    /**
     * Cache of the last step we were on.
     */
    private lastStep: number = 0;

    /**
     * The mechanics who performed the work.
     */
    private mechanics: Mechanic[] = [];

    /**
     * The ID of the selected mechanic.
     */
    private selectedMechanicIndex: number = -1;

    /**
     * The date that the maintenance event occured on.
     */
    private date: Nullable<Date> = null;

    /**
     * The mileage of the service.
     */
    private mileage: Nullable<number> = null;

    /**
     * The services available for picking.
     */
    private availableServices: string[] = [];

    /**
     * The services that the user selected.
     */
    private selectedServices: string[] = [];

    private cost: Nullable<number> = null;

    /**
     * On load, pull in the mechanics from the database.
     */
    public async created(): Promise<void> {
        this.$validator.localize('en', {
            custom: {
                addMaintenanceMechanic: {
                    required: 'Mechanic is required.',
                    min_value: 'Mechanic is required.',
                },
                addMaintenanceMileage: {
                    required: 'Mileage maintenance occured at is required.',
                    integer: 'Mileage maintenance occured at must be an integer.',
                    min_value: 'Mileage maintenance occured at must be greater than 0.',
                },
                addMaintenanceDate: {
                    required: 'Date of maintenance is required.',
                    date_format: 'Date must be in format MM/DD/YYYY',
                },
                addMaintenanceCost: {
                    required: 'Cost of maintenance is required.',
                    decimal: 'Cost of maintenance may only have 2 decimal places.',
                },
            },
        });

        this.mechanics = await (await this.$mechanicStore.getMechanics()).do(async (mechanics) => mechanics, async (error) => []);
        this.availableServices = this.serviceList;
    }

    /**
     * Event handler for when the user cicks a tab.
     */
    public async onTabClick(): Promise<void> {
        if (
            (await this.$validator.validateAll(`tab${this.lastStep + 1}`)) &&
            ((this.activeStep === 3 && this.selectedServices.length > 0) || this.activeStep !== 3)
        ) {
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
        if (
            (await this.$validator.validateAll(`tab${this.activeStep + 1}`)) &&
            ((this.activeStep === 3 && this.selectedServices.length > 0) || this.activeStep !== 3)
        ) {
            this.activeStep--;
        }
    }

    /**
     * Event handler for when the user clicks the next button.
     */
    public async onNextClick(): Promise<void> {
        if (
            (await this.$validator.validateAll(`tab${this.activeStep + 1}`)) &&
            ((this.activeStep === 3 && this.selectedServices.length > 0) || this.activeStep !== 3)
        ) {
            this.activeStep++;
        }
    }

    /**
     * Event handler for when the user clicks on a service in the available
     * list. This will move it over to the selected list.
     */
    private async onAvailableServiceClick(index: number): Promise<void> {
        const temp = this.availableServices.splice(index, 1);
        this.selectedServices.push(temp[0]);

        this.selectedServices.sort();
        this.availableServices.sort();
    }

    /**
     * Event handler for when the user selects an already selected service.
     * This will unselect it.
     */
    private async onSelectedServiceClick(index: number): Promise<void> {
        const temp = this.selectedServices.splice(index, 1);
        this.availableServices.push(temp[0]);

        this.selectedServices.sort();
        this.availableServices.sort();
    }

    /**
     * Event handler for when the user clicks the add button.
     */
    public async onAddClick(): Promise<void> {
        const mech = this.mechanics.find((m) => m.id === this.selectedMechanicIndex);
        const maintenance: MaintenanceEvent = new MaintenanceEvent(
            this.mileage!,
            this.date!,
            mech!,
            this.selectedServices.map((s) => new MaintenanceService(s))
        );
        maintenance.totalCost = this.cost || 0;

        this.$emit('add', maintenance);
        this.hide();
    }

    /**
     * Show the popup on screen.
     */
    public show() {
        this.$validator.reset();
        this.$refs.popup.show();
        this.activeStep = 0;
        this.$forceUpdate();
    }

    /**
     * Hide the popup on screen.
     */
    public hide() {
        this.$refs.popup.hide();
        this.$forceUpdate();
    }

    /**
     * All of the services. Starting point for now
     */
    public serviceList: string[] = [
        'Adjust Valve Clearance',
        'Adjust Wheel Alignment',
        'Change Air Filter',
        'Change Engine Coolant',
        'Change Fuel Filter',
        'Change Oil & Filter',
        'Change Spark Plugs',
        'Clean Carbeurator',
        'Clean Throttle Body',
        'Clean Fuel Injectors',
        'Emissions Inspection',
        'Inspect Battery',
        'Inspect Brakes',
        'Inspect Cooling System',
        'Inspect Drive Shaft Boot',
        'Inspect Engine Belts',
        'Inspect Hoses',
        'Inspect Muffler',
        'Inspect PCV Valve',
        'Inspect Springs',
        'Inspect Starter',
        'Inspect Suspension',
        'Inspect Tire Pressure',
        'Inspect Tire Tread Wear',
        'Inspect Transaxle',
        'Inspect Windshield Wipers',
        'Lube Chassis',
        'Other',
        'Recall',
        'Recharge Air Conditioner',
        'Replace Air Conditioner Compressor',
        'Replace Alternator',
        'Replace Battery',
        'Replace Brake Drum Shoes',
        'Replace Brake Fluid',
        'Replace Cap, Rotor & Spark Plug Wires',
        'Replace Catalytic Converter',
        'Replace Clutch',
        'Replace Control Arm Lower Ball Joint',
        'Replace Disc Brake Calipers',
        'Replace Disc Brake Pads',
        'Replace Drum Brake Cylinders',
        'Replace Drum Brake Shoes',
        'Replace Engine Belts',
        'Replace Exhaust Pipes',
        'Replace Fuel Injectors',
        'Replace Fuel Pump',
        'Replace Heater Core',
        'Replace Key',
        'Replace Oil Pump',
        'Replace Oxygen Sensor',
        'Replace PCV Valve',
        'Replace Power Steering Pump',
        'Replace Radiator',
        'Replace Radiator Hoses',
        'Replace Key Remote',
        'Replace Shock Absorbers',
        'Replace Struts',
        'Replace Thermostat',
        'Replace Tie Rods',
        'Replace Timing Belt',
        'Replace Timing Chain',
        'Replace Tires',
        'Replace Transmission Filter',
        'Replace Transmission Fluid',
        'Replace Universal CV Joint',
        'Replace Valve Lifters',
        'Replace Water Pump',
        'Replace Windshield Wipers',
        'Rotate Tires',
        'State Inspection',
        'Top Off Anti-Freeze',
        'Top Off Brake Fluid',
        'Top Off Clutch Fluid',
        'Top Off Engine Coolant',
        'Top Off Engine Oil',
        'Top Off Power Steering Fluid',
        'Top Off Transmission Fluid',
        'Top Off Windshield Washer Fluid',
        'Tune Up Engine',
    ];
}
</script>
