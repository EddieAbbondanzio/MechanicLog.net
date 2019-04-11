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
        <b-table :fields="columns" :items="parts" class="mt-2">
            <template slot="quantity" slot-scope="data">
                <div
                    v-if="activeIndex == data.index"
                    class="d-flex flex-column align-items-center h-100"
                >
                    <input type="text" v-model.number="data.item.quantity" class="w-100">
                </div>
                <div v-else>{{ data.item.quantity }}</div>
            </template>
            <template slot="code" slot-scope="data">
                <div v-if="activeIndex == data.index">
                    <input type="text" v-model="data.item.code" class="w-100">
                </div>
                <div v-else style="min-width: 0px;">
                    <span class="text-truncate">{{ data.item.code }}</span>
                </div>
            </template>
            <template slot="cost" slot-scope="data">
                <div v-if="activeIndex == data.index">
                    <input type="text" v-model.number="data.item.cost" class="w-100">
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
import { MaintenanceLineType } from '../../entities/maintenance-line-type';
import MaterialIcon from '@/core/components/material-icon.vue';

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
        { key: 'quantity', label: 'Quantity', class: 'col-3 align-right' },
        { key: 'code', label: 'Description', class: 'col-5 align-left' },
        { key: 'cost', label: 'Cost', class: 'col-2 align-right' },
        { key: 'actions', label: 'Actions', class: 'col-2 align-left' },
    ];

    /**
     * The part data being built
     */
    protected readonly parts: Partial<MaintenanceLine>[] = [{ quantity: 1, code: 'O2 Sensor', cost: 129.99 }, { quantity: 5, code: 'Oil', cost: 29.99 }];

    /**
     * The index of the active item being editted.
     */
    protected activeIndex: number = -1;

    /**
     * The backup to hold a item in case we need to revert.
     */
    protected backup: Partial<MaintenanceLine> = {};

    /**
     * User wants to add a new part to the list.
     */
    protected async onAddClick() {
        this.parts.push({ type: MaintenanceLineType.Part });
        this.activeIndex = this.parts.length - 1;
    }

    /**
     * User wants to edit a row.
     */
    protected async onEditClick(index: number) {
        this.activeIndex = index;
        this.backup = Object.assign({}, this.parts[this.activeIndex]);
    }

    /**
     * User wants to confirm their edit.
     */
    protected async onEditConfirm() {
        this.activeIndex = -1;
    }

    protected async onEditCancel() {
        this.parts[this.activeIndex].quantity = this.backup.quantity;
        this.parts[this.activeIndex].code = this.backup.code;
        this.parts[this.activeIndex].cost = this.backup.cost;
        this.activeIndex = -1;
    }

    /**
     * Delete a part from the list.
     */
    protected async onDeleteClick(index: number) {
        this.parts.splice(index, 1);
    }
}
</script>