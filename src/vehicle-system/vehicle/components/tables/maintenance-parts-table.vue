<style lang="scss" scoped>
</style>


<template>
    <div>
        <!-- Header + Add Button -->
        <div class="pb-2" style="height: 40px;">
            <h3 class="float-left mb-0 pb-0">Parts</h3>
            <b-button
                variant="success"
                class="float-right"
                @click="onAddClick"
                v-if="activeIndex < 0"
            >
                <material-icon icon="add" color="light" size="md" class="align-middle"/>
                <span class="align-middle">Add</span>
            </b-button>
        </div>

        <!-- Table -->
        <b-table :fields="columns" :items="parts" class="mt-2 table-layout-fixed">
            <template slot="quantity" slot-scope="data">
                <div v-if="activeIndex == data.index">
                    <input
                        type="text"
                        v-model.number="data.item.quantity"
                        class="w-100 form-control"
                        name="partQuantity"
                        v-validate="'required|min_value:1|integer'"
                    >

                    <b-form-invalid-feedback>{{ errors.first('partQuantity') }}</b-form-invalid-feedback>
                </div>
                <div v-else>{{ data.item.quantity }}</div>
            </template>
            <template slot="code" slot-scope="data">
                <div v-if="activeIndex == data.index">
                    <input
                        type="text"
                        v-model="data.item.code"
                        class="w-100 form-control"
                        name="partCode"
                        v-validate="'required|max:32'"
                    >

                    <b-form-invalid-feedback>{{ errors.first('partCode') }}</b-form-invalid-feedback>
                </div>
                <div v-else class="text-truncate" :title="data.item.code">{{ data.item.code }}</div>
            </template>
            <template slot="cost" slot-scope="data">
                <div v-if="activeIndex == data.index">
                    <input
                        type="text"
                        v-model.number="data.item.cost"
                        class="w-100 form-control"
                        name="partCost"
                        v-validate="'required|decimal:2'"
                    >

                    <b-form-invalid-feedback>{{ errors.first('partCost') }}</b-form-invalid-feedback>
                </div>
                <div v-else>{{ data.item.cost }}</div>
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
import { MaintenanceLine } from '../../entities/maintenance-line';
import MaterialIcon from '@/core/components/material-icon.vue';
import { MaintenanceLineType } from '../../entities/maintenance-line-type';

/**
 * State of the table. Not exported since only this component will ever use it.
 */
enum MaintenancePartsTableState {
    Standby,
    Adding,
    Editing,
}

/**
 * Component for building parts list for a maintenance event. Allows users to add,
 * update, or delete part lines.
 */
@Component({
    name: 'maintenance-parts-table',
    components: {
        MaterialIcon,
    },
})
export default class MaintenancePartsTable extends Vue {
    protected readonly columns = [
        { key: 'quantity', label: 'Quantity', class: 'align-right w-20', thClass: 'required text-nowrap' },
        { key: 'code', label: 'Description', class: 'align-left w-40', thClass: 'required text-nowrap' },
        { key: 'cost', label: 'Cost', class: 'align-right w-20', thClass: 'required text-nowrap' },
        { key: 'actions', label: 'Actions', class: 'align-left w-20' },
    ];

    @Prop()
    public value!: MaintenanceLine[];

    /**
     * The part data being built
     */
    protected parts: Partial<MaintenanceLine>[] = [];

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
    protected state: MaintenancePartsTableState = MaintenancePartsTableState.Standby;

    /**
     * When the control is created, set up the validator.
     */
    public async created() {
        this.$validator.localize('en', {
            custom: {
                partQuantity: {
                    required: 'Part quantity is required.',
                    integer: 'Part quantity must be an integer.',
                    min_value: 'Part quantity must be greater than 0.',
                },
                partCode: {
                    required: 'Part description is required.',
                    max: 'Part description must be 32 characters or less.',
                },
                partCost: {
                    required: 'Part cost is required.',
                    decimal: 'Part cost must be 2 decimal places or less.',
                },
            },
        });

        this.parts = this.value;
    }

    public reset() {
        this.parts = [];
        this.activeIndex = -1;
        this.backup = {};
        this.state = MaintenancePartsTableState.Standby;
    }

    /**
     * User wants to add a new part to the list.
     */
    protected async onAddClick() {
        this.state = MaintenancePartsTableState.Adding;
        const part = new MaintenanceLine({ type: MaintenanceLineType.Part });
        this.parts.push(part);

        this.activeIndex = this.parts.length - 1;
        this.$emit('focus');
    }

    /**
     * User wants to edit a row.
     */
    protected async onEditClick(index: number) {
        this.state = MaintenancePartsTableState.Editing;
        this.activeIndex = index;
        this.backup = Object.assign({}, this.parts[this.activeIndex]);
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
        this.state = MaintenancePartsTableState.Standby;
        this.$emit('blur');
        this.$emit('input', this.parts);
    }

    /**
     * User wants to cancel adding to the table.
     */
    protected async onEditCancel() {
        switch (this.state) {
            case MaintenancePartsTableState.Adding:
                this.parts.splice(this.parts.length - 1, 1);
                break;

            case MaintenancePartsTableState.Editing:
                this.parts[this.activeIndex].type = MaintenanceLineType.Part;
                this.parts[this.activeIndex].quantity = this.backup.quantity;
                this.parts[this.activeIndex].code = this.backup.code;
                this.parts[this.activeIndex].cost = this.backup.cost;
                break;
        }

        this.activeIndex = -1;
        this.state = MaintenancePartsTableState.Standby;
        this.$emit('blur');
    }

    /**
     * Delete a part from the list.
     */
    protected async onDeleteClick(index: number) {
        this.parts.splice(index, 1);
        this.$emit('input', this.parts);
    }
}
</script>