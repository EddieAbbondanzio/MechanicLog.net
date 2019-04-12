<style lang="scss" scoped>
</style>


<template>
    <popup-container
        id="addMaintenance"
        ref="popup"
        title="Add Maintenance"
        size="xl"
        headerColor="primary"
    >
        <form>
            <b-card no-body border-variant="white">
                <b-tabs v-model="activeStep">
                    <b-tab title="Parts" class="py-4" @click="onTabClick" :disabled="isBusy">
                        <maintenance-parts-table
                            ref="partsTable"
                            @focus="onFocus"
                            @blur="onBlur"
                            v-model="parts"
                        />
                    </b-tab>

                    <b-tab title="Labor" class="py-4" @click="onTabClick" :disabled="isBusy">
                        <maintenance-labor-table
                            ref="laborTable"
                            @focus="onFocus"
                            @blur="onBlur"
                            v-model="labor"
                        />
                    </b-tab>

                    <b-tab title="Other" class="py-4" @click="onTabClick" :disabled="isBusy">
                        <maintenance-others-table
                            ref="othersTable"
                            @focus="onFocus"
                            @blur="onBlur"
                            v-model="others"
                        />
                    </b-tab>

                    <b-tab title="Cost" class="py-4" @click="onTabClick" :disabled="isBusy">
                        <b-form-group>
                            <label
                                for="cost-calculation-dropdown"
                                class="required"
                            >Cost Calculation Method</label>
                            <b-select
                                id="cost-calculation-dropdown"
                                v-model="cost.calculationMethod"
                                @change="onCalculationMethodChange"
                            >
                                <option :value="0">Calculated</option>
                                <option :value="1">Manual</option>
                            </b-select>
                        </b-form-group>

                        <b-form-group>
                            <label for="labor-cost-textbox">Labor Cost</label>
                            <input
                                type="text"
                                id="labor-cost-textbox"
                                class="form-control"
                                v-model="cost.laborCost"
                                :disabled="cost.calculationMethod == 0"
                            >
                        </b-form-group>

                        <b-form-group>
                            <label for="parts-cost-textbox">Parts Cost</label>
                            <input
                                type="text"
                                id="parts-cost-textbox"
                                class="form-control"
                                v-model="cost.partsCost"
                                :disabled="cost.calculationMethod == 0"
                            >
                        </b-form-group>

                        <b-form-group>
                            <label for="other-cost-textbox">Other Cost</label>
                            <input
                                type="text"
                                id="other-cost-textbox"
                                class="form-control"
                                v-model="cost.otherCost"
                                :disabled="cost.calculationMethod == 0"
                            >
                        </b-form-group>

                        <b-form-group>
                            <label for="total-cost-textbox" class="required">Total Cost</label>
                            <input
                                type="text"
                                id="total-cost-textbox"
                                class="form-control"
                                v-model="cost.totalCost"
                                :disabled="cost.calculationMethod == 0"
                            >
                        </b-form-group>
                    </b-tab>

                    <b-tab title="Misc. Info" class="py-4" @click="onTabClick" :disabled="isBusy">
                        <b-form-group>
                            <label for="date-textbox" class="required">Date</label>
                            <input
                                type="date"
                                class="form-control"
                                id="date-textbox"
                                placeholder="03/03/2019"
                                v-model="date"
                                name="maintenanceDate"
                                data-vv-scope="tab5"
                                v-validate="'required'"
                            >
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab5.maintenanceDate') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group>
                            <label for="odometer-textbox" class="required">Odometer</label>
                            <input
                                type="text"
                                class="form-control"
                                id="odometer-textbox"
                                placeholder="123999"
                                v-model.number="odometer"
                                name="maintenanceOdometer"
                                data-vv-scope="tab5"
                                v-validate="'required|min_value:0|integer'"
                            >
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab5.maintenanceOdometer') }}</b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group>
                            <label for="description-textbox" class="required">Description</label>
                            <input
                                type="text"
                                id="description-textbox"
                                class="form-control"
                                placeholder="Changed oil, and filter"
                                v-model="description"
                                name="addMaintenanceDescription"
                                data-vv-scope="tab5"
                                v-validate="`required|max:64`"
                            >
                            <b-form-invalid-feedback
                                class="d-block"
                            >{{ errors.first('tab5.addMaintenanceDescription') }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-tab>
                </b-tabs>
            </b-card>
        </form>
        <!-- Previous Button -->
        <div slot="footer">
            <b-button
                variant="success"
                class="float-left"
                tabindex="-1"
                @click="onPreviousClick"
                v-if="activeStep > 0"
                :disabled="isBusy"
            >Previous</b-button>

            <!-- Next Button -->
            <b-button
                variant="success"
                class="float-right"
                @click="onNextClick"
                v-if="activeStep < 4"
                :disabled="isBusy"
            >Next</b-button>

            <!-- Create Button -->
            <b-button variant="primary" class="float-right" @click="onAddClick($event)" v-else>Add</b-button>
        </div>
    </popup-container>
</template>

<script lang="ts">
import PopupContainer from '@/core/components/popup/popup-container.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';
import { MaintenanceCostCalculationMethod } from '../../entities/maintenance-cost-calculation-method';
import { Nullable } from '../../../../core/common/monads/nullable';
import { MaintenanceLine } from '../../entities/maintenance-line';
import { MaintenanceLineType } from '../../entities/maintenance-line-type';
import MaintenancePartsTable from '@/vehicle-system/vehicle/components/tables/maintenance-parts-table.vue';
import MaintenanceLaborTable from '@/vehicle-system/vehicle/components/tables/maintenance-labor-table.vue';
import MaintenanceOthersTable from '../tables/maintenance-others-table.vue';
import { MaintenanceCost } from '../../entities/maintenance-cost';
import { Maintenance } from '../../entities/maintenance';

@Component({
    name: 'add-maintenance-popup',
    components: {
        PopupContainer,
        MaterialIcon,
        MaintenancePartsTable,
        MaintenanceLaborTable,
        MaintenanceOthersTable,
    },
})
export default class AddMaintenancePopup extends Vue {
    public readonly otherColumnNames = [
        { key: 'description', label: 'Description', class: 'align-left' },
        { key: 'cost', label: 'Cost', class: 'align-right' },
        { key: 'actions', label: 'Actions', class: 'align-left' },
    ];

    public $refs!: {
        popup: PopupContainer;
        partsTable: MaintenancePartsTable;
        laborTable: MaintenanceLaborTable;
        othersTable: MaintenanceOthersTable;
    };

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
     * The parts used during the maintenance.
     */
    public parts: MaintenanceLine[] = [];

    /**
     * The labor lines.
     */
    public labor: MaintenanceLine[] = [];

    /**
     * The other lines of the maintenance.
     */
    public others: MaintenanceLine[] = [];

    /**
     * The cost details of the maintenance
     */
    public cost: MaintenanceCost = new MaintenanceCost({ calculationMethod: MaintenanceCostCalculationMethod.Line });

    /**
     * The date the maintenance was performed on.
     */
    public date: Nullable<Date> = null;

    /**
     * The mileage of the car when the service was performed.
     */
    public odometer: Nullable<number> = null;

    /**
     * The description of the work performed.
     */
    public description: Nullable<string> = null;

    /**
     * If the user is currently performing some kind of input.
     */
    public isBusy: boolean = false;

    public async created() {
        this.$validator.localize('en', {
            custom: {
                maintenanceDate: {
                    required: 'Date of maintenance is required.',
                },
                maintenanceOdometer: {
                    required: 'Odometer reading of maintenance is required.',
                    min_value: 'Odometer reading must be greater than 0.',
                    integer: 'Odometer reading must be an integer',
                },
                addMaintenanceDescription: {
                    required: 'Description is required.',
                    max: `Description length must be less than 64 characters.`,
                },
            },
        });
    }

    public async show() {
        await this.reset();
        await this.$refs.popup.show();
        this.$forceUpdate();
    }

    public async hide() {
        this.$refs.popup.hide();
    }

    public async reset() {
        this.isBusy = false;
        this.activeStep = 0;
        this.lastStep = 0;
        this.parts = [];
        this.labor = [];
    }

    /**
     * Event handler for when the user cicks a tab.
     */
    public async onTabClick(): Promise<void> {
        // If busy, go back to previous tab
        if (this.isBusy) {
            // Jump back. Needs to be in the next tick.
            Vue.nextTick(() => {
                this.activeStep = this.lastStep;
            });

            return;
        }

        if (await this.$validator.validateAll(`tab${this.lastStep + 1}`)) {
            // Gotta cache last tab somehow. $event is coming in undefined...
            this.lastStep = this.activeStep;
        } else {
            this.activeStep = this.lastStep;
        }

        // Gotta do some calculations on this boi
        if (this.activeStep === 3 && this.cost.calculationMethod === MaintenanceCostCalculationMethod.Line) {
            this.cost = this.calculateCost();
        }
    }

    /**
     * Event handler for when the user clicks the previous button.
     */
    protected async onPreviousClick(): Promise<void> {
        if (await this.$validator.validateAll(`tab${this.activeStep + 1}`)) {
            this.activeStep--;
        }
    }

    /**
     * Event handler for when the user clicks the next button.
     */
    protected async onNextClick(): Promise<void> {
        if (await this.$validator.validateAll(`tab${this.activeStep + 1}`)) {
            this.activeStep++;
        }
    }

    /**
     * Finalize the maintenance record and pass it to the page.
     */
    protected async onAddClick() {
        if (!(await this.$validator.validateAll('tab5'))) {
            return;
        }

        const lines: MaintenanceLine[] = [...this.parts, ...this.labor, ...this.others];

        this.$emit(
            'add',
            new Maintenance({
                date: this.date!,
                odometer: this.odometer!,
                description: this.description!,
                cost: this.cost,
                lines,
            })
        );

        this.hide();
    }

    /**
     * Calculate the cost of the maintenance.
     */
    protected calculateCost(): MaintenanceCost {
        const partsCost = this.parts.length > 0 ? this.parts.map((l) => l.cost * l.quantity).reduce((a, b) => a + b) : 0;
        const laborCost = this.labor.length > 0 ? this.labor.map((l) => l.cost).reduce((a, b) => a + b) : 0;
        const otherCost = this.others.length > 0 ? this.others.map((l) => l.cost).reduce((a, b) => a + b) : 0;
        const totalCost = partsCost + laborCost + otherCost;

        return new MaintenanceCost({ calculationMethod: MaintenanceCostCalculationMethod.Line, partsCost, laborCost, otherCost, totalCost });
    }

    protected async onCalculationMethodChange(value: any) {
        if (value === 0) {
            this.cost = this.calculateCost();
        }
    }

    /**
     * User has started to interact with a child component.
     */
    protected async onFocus() {
        this.isBusy = true;
    }

    /**
     * User has stopped working with a child component.
     */
    protected async onBlur() {
        this.isBusy = false;
    }
}
</script>