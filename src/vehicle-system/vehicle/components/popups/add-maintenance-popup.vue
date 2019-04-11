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
                    <b-tab title="Parts" class="py-4" @click="onTabClick">
                        <maintenance-parts-table ref="partsTable" @focus="onFocus" @blur="onBlur"/>
                    </b-tab>

                    <b-tab title="Labor" class="py-4" @click="onTabClick">
                        <div class="clearfix pb-2">
                            <h3 class="float-left mb-0 pb-0">Labor</h3>
                            <b-button variant="success" class="float-right">
                                <material-icon
                                    icon="add"
                                    color="light"
                                    size="md"
                                    class="align-middle"
                                />
                                <span class="align-middle">Add</span>
                            </b-button>
                        </div>

                        <b-table :fields="laborColumnNames"/>
                    </b-tab>

                    <b-tab title="Other" class="py-4" @click="onTabClick">
                        <div class="clearfix pb-2">
                            <h3 class="float-left mb-0 pb-0">Other</h3>
                            <b-button variant="success" class="float-right">
                                <material-icon
                                    icon="add"
                                    color="light"
                                    size="md"
                                    class="align-middle"
                                />
                                <span class="align-middle">Add</span>
                            </b-button>
                        </div>

                        <b-table :fields="otherColumnNames"/>
                    </b-tab>

                    <b-tab title="Cost" class="py-4" @click="onTabClick">
                        <b-form-group>
                            <label
                                for="cost-calculation-dropdown"
                                class="required"
                            >Cost Calculation Method</label>
                            <b-select id="cost-calculation-dropdown" v-model="calculationMethod">
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
                                :disabled="calculationMethod == 0"
                            >
                        </b-form-group>

                        <b-form-group>
                            <label for="labor-cost-textbox">Parts Cost</label>
                            <input
                                type="text"
                                id="labor-cost-textbox"
                                class="form-control"
                                :disabled="calculationMethod == 0"
                            >
                        </b-form-group>

                        <b-form-group>
                            <label for="labor-cost-textbox">Other Cost</label>
                            <input
                                type="text"
                                id="labor-cost-textbox"
                                class="form-control"
                                :disabled="calculationMethod == 0"
                            >
                        </b-form-group>

                        <b-form-group>
                            <label for="total-cost-textbox" class="required">Total Cost</label>
                            <input
                                type="text"
                                id="total-cost-textbox"
                                class="form-control"
                                :disabled="calculationMethod == 0"
                            >
                        </b-form-group>
                    </b-tab>

                    <b-tab title="Misc. Info" class="py-4" @click="onTabClick">
                        <b-form-group>
                            <label for="labor-cost-textbox" class="required">Description</label>
                            <input
                                type="text"
                                id="labor-cost-textbox"
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
import { MaintenanceLineCreationData } from '../../entities/maintenance-line-creation-data';
import { MaintenanceLineType } from '../../entities/maintenance-line-type';
import MaintenancePartsTable from '@/vehicle-system/vehicle/components/tables/maintenance-parts-table.vue';

@Component({
    name: 'add-maintenance-popup',
    components: {
        PopupContainer,
        MaterialIcon,
        MaintenancePartsTable,
    },
})
export default class AddMaintenancePopup extends Vue {
    public readonly laborColumnNames = [
        { key: 'quanity', label: 'Hours', class: 'align-right' },
        { key: 'description', label: 'Description', class: 'align-left' },
        { key: 'cost', label: 'Cost', class: 'align-right' },
        { key: 'actions', label: 'Actions', class: 'align-left' },
    ];

    public readonly otherColumnNames = [
        { key: 'description', label: 'Description', class: 'align-left' },
        { key: 'cost', label: 'Cost', class: 'align-right' },
        { key: 'actions', label: 'Actions', class: 'align-left' },
    ];

    public $refs!: {
        popup: PopupContainer;
        partsTable: MaintenancePartsTable;
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
    public parts: MaintenanceLineCreationData[] = [];

    /**
     * How to calculate the cost by.
     */
    public calculationMethod: MaintenanceCostCalculationMethod = MaintenanceCostCalculationMethod.Line;

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
                addMaintenanceDescription: {
                    required: 'Description of the maintenance is required.',
                    max: `Description length must be less than 64 characters.`,
                },
            },
        });
    }

    public async onAddPartClick() {
        this.parts.push({ type: MaintenanceLineType.Part, quantity: 1, cost: 0 });
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
        this.activeStep = 0;
        this.lastStep = 0;
        this.parts = [];
    }

    /**
     * Event handler for when the user cicks a tab.
     */
    public async onTabClick(): Promise<void> {
        //If busy, go back to previous tab
        if (this.isBusy) {
            this.activeStep = this.lastStep;
            console.log('active step is: ', this.activeStep);
            return;
        }

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