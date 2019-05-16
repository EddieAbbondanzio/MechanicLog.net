<style lang="scss" scoped>
</style>


<template>
    <div>
        <!-- Header + Add Button -->
        <div class="pb-2" style="height: 40px;">
            <h3 class="float-left mb-0 pb-0">Labor</h3>
            <b-button
                variant="success"
                class="float-right"
                @click="onAddClick"
                v-if="activeIndex < 0 && !readonly"
            >
                <material-icon icon="add" color="light" size="md" class="align-middle"/>
                <span class="align-middle">Add</span>
            </b-button>
        </div>

        <!-- Table -->
        <b-table :fields="columns" :items="labor" class="mt-2 table-layout-fixed">
            <template slot="code" slot-scope="data">
                <div v-if="activeIndex == data.index">
                    <input
                        type="text"
                        v-model="data.item.code"
                        class="w-100 form-control"
                        name="laborCode"
                        v-validate="'required|max:32'"
                    >

                    <b-form-invalid-feedback>{{ errors.first('laborCode') }}</b-form-invalid-feedback>
                </div>
                <div v-else class="text-truncate" :title="data.item.code">{{ data.item.code }}</div>
            </template>
            <template slot="cost" slot-scope="data">
                <div v-if="activeIndex == data.index">
                    <input
                        type="text"
                        v-model.number="data.item.cost"
                        class="w-100 form-control"
                        name="laborCost"
                        v-validate="'required|decimal:2'"
                    >

                    <b-form-invalid-feedback>{{ errors.first('laborCost') }}</b-form-invalid-feedback>
                </div>
                <div v-else>{{ data.item.cost | currency }}</div>
            </template>
            <template slot="actions" slot-scope="data">
                <div v-if="activeIndex < 0">
                    <a href="#" @click="onEditClick(data.index)" title="Click to edit">
                        <material-icon icon="edit" color="primary" class="px-1"/>
                    </a>
                    <a href="#" @click="onDeleteClick(data.index)" title="Click to delete">
                        <material-icon icon="delete" color="primary" class="px-1"/>
                    </a>
                </div>
                <div v-else-if="activeIndex == data.index">
                    <a href="#" @click="onEditConfirm" title="Save changes">
                        <material-icon icon="save" color="primary" class="px-1"/>
                    </a>
                    <a href="#" @click="onEditCancel" title="Cancel changes">
                        <material-icon icon="cancel" color="primary" class="px-1"/>
                    </a>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MaintenanceLine } from '@/vehicle-system/entities/maintenance/maintenance-line';
import { MaintenanceLineType } from '@/vehicle-system/common/maintenance-line-type';
import MaterialIcon from '@/core/components/material-icon.vue';

/**
 * State of the table. Not exported since only this component will ever use it.
 */
enum MaintenanceLaborTableState {
    Standby,
    Adding,
    Editing,
}

/**
 * Table for managing the labor lines of a maintenance record.
 */
@Component({
    name: 'maintenance-labor-table',
    components: {
        MaterialIcon,
    },
})
export default class MaintenanceLaborTable extends Vue {
    protected readonly columns: {}[] = [
        { key: 'code', label: 'Description', class: 'align-left w-60', thClass: 'required text-nowrap' },
        { key: 'cost', label: 'Cost', class: 'align-right w-20', thClass: 'required text-nowrap' },
    ];

    @Prop()
    public value!: MaintenanceLine[];

    /**
     * If the table is in readonly mode.
     */
    @Prop()
    public readonly!: boolean;

    /**
     * The labor data being built
     */
    protected labor: Partial<MaintenanceLine>[] = [];

    /**
     * The index of the active item being editted.
     */
    protected activeIndex: number = -1;

    /**
     * The backup to hold a item in case we need to revert.
     */
    protected backup: Partial<MaintenanceLine> = {};

    /**
     * The current state of the table.
     */
    protected state: MaintenanceLaborTableState = MaintenanceLaborTableState.Standby;

    /**
     * When the control is created, set up the validator.
     */
    public async created() {
        if (!this.readonly) {
            this.columns.push({ key: 'actions', label: 'Actions', class: 'align-left w-20' });
        }

        this.$validator.localize('en', {
            custom: {
                laborCode: {
                    required: 'Labor description is required.',
                    max: 'Labor description must be 32 characters or less.',
                },
                laborCost: {
                    required: 'Labor cost is required.',
                    decimal: 'Labor cost must be 2 decimal places or less.',
                },
            },
        });

        this.labor = this.value;
    }

    public reset() {
        this.labor = [];
        this.activeIndex = -1;
        this.backup = {};
        this.state = MaintenanceLaborTableState.Standby;
    }

    /**
     * User wants to add a new labor to the list.
     */
    protected async onAddClick() {
        this.state = MaintenanceLaborTableState.Adding;
        this.labor.push({ type: MaintenanceLineType.Labor, quantity: 1 });
        this.activeIndex = this.labor.length - 1;
        this.$emit('focus');
    }

    /**
     * User wants to edit a row.
     */
    protected async onEditClick(index: number) {
        this.state = MaintenanceLaborTableState.Editing;
        this.activeIndex = index;
        this.backup = Object.assign({}, this.labor[this.activeIndex]);
        this.$emit('focus');
    }

    /**
     * User wants to confirm their edit.
     */
    protected async onEditConfirm() {
        if (!(await this.$validator.validateAll())) {
            return;
        }

        this.activeIndex = -1;
        this.state = MaintenanceLaborTableState.Standby;
        this.$emit('blur');
        this.$emit('input', this.labor);
    }

    /**
     * User wants to cancel adding to the table.
     */
    protected async onEditCancel() {
        switch (this.state) {
            case MaintenanceLaborTableState.Adding:
                this.labor.splice(this.labor.length - 1, 1);
                break;

            case MaintenanceLaborTableState.Editing:
                this.labor[this.activeIndex].type = MaintenanceLineType.Labor;
                this.labor[this.activeIndex].quantity = this.backup.quantity;
                this.labor[this.activeIndex].code = this.backup.code;
                this.labor[this.activeIndex].cost = this.backup.cost;
                break;
        }

        this.activeIndex = -1;
        this.state = MaintenanceLaborTableState.Standby;
        this.$emit('blur');
    }

    /**
     * Delete a labor item from the list.
     */
    protected async onDeleteClick(index: number) {
        this.labor.splice(index, 1);
        this.$emit('input', this.labor);
    }
}
</script>