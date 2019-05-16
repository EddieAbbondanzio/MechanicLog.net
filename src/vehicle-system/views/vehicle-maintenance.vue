<style lang="scss" scoped>
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';
.vehicle-detail-edit {
    &:hover {
        background-color: $gray-200 !important;
    }
    &:active {
        background-color: $gray-300 !important;
    }
}
</style>

<template>
    <div class="row px-3">
        <div class="col-12 px-0 mx-0">
            <add-maintenance-popup ref="addMaintenancePopup" @add="onMaintenanceAdd"/>
            <error-popup ref="errorPopup"/>
            <delete-maintenance-popup ref="deletePopup" @delete="onDelete"/>

            <!-- Table Header -->
            <card-container>
                <div class="pb-3 clearfix">
                    <h2 class="float-left">Maintenance</h2>

                    <b-btn
                        variant="success"
                        style="height: 40px"
                        class="rounded float-right"
                        @click="onAddClick"
                    >
                        <material-icon icon="add" size="md" class="align-middle"/>
                        <span class="align-middle">Add Maintenance</span>
                    </b-btn>
                </div>

                <b-table
                    :fields="columnNames"
                    :items="maintenance"
                    :busy="isBusy"
                    hover
                    tbodyTrClass="cursor-pointer"
                    @row-clicked="onRowClick"
                >
                    <template slot="odometer" slot-scope="row">{{ row.item.odometer | number }}</template>
                    <template slot="date" slot-scope="row">{{ row.item.date | date }}</template>
                    <template slot="description" slot-scope="row">{{ row.item.description }}</template>
                    <template slot="options" slot-scope="row">
                        <b-dropdown no-caret variant="link" class="maintenance-options">
                            <div slot="button-content">
                                <material-icon
                                    icon="more_vert"
                                    color="muted"
                                    size="md"
                                    class="align-middle m-0 p-0"
                                />
                            </div>

                            <b-dropdown-item
                                href="#"
                                class="text-danger"
                                @click="onDeleteClick(row.item.id)"
                            >Delete</b-dropdown-item>
                        </b-dropdown>
                    </template>
                </b-table>
            </card-container>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VehicleMixin } from '@/vehicle-system/mixins/vehicle-mixin';
import { Vehicle } from '@/vehicle-system/entities/vehicle/vehicle';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Maybe } from '@/core/common/monads/maybe';
import { Nullable } from '@/core/common/monads/nullable';
import CardContainer from '@/core/components/cards/card-container.vue';
import VehicleDetailsCard from '@/vehicle-system/components/cards/vehicle-details-card.vue';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import { EventBus } from '@/core/event/event-bus';
import AddMaintenancePopup from '@/vehicle-system/components/popups/add-maintenance-popup.vue';
import DeleteMaintenancePopup from '@/vehicle-system/components/popups/delete-maintenance-popup.vue';
import { Maintenance } from '../entities/maintenance/maintenance';

/**
 * Maintenance history page.
 */
@Component({
    name: 'vehicle-maintenance',
    components: {
        MaterialIcon,
        CardContainer,
        VehicleDetailsCard,
        ErrorPopup,
        AddMaintenancePopup,
        DeleteMaintenancePopup,
    },
})
export default class VehicleMaintenance extends VehicleMixin {
    public readonly columnNames = [
        { key: 'odometer', label: 'Odometer', class: 'align-middle', sortable: true },
        { key: 'date', label: 'Date', class: 'align-middle', sortable: true },
        { key: 'description', label: 'Description', class: 'align-left', softable: true },
        { key: 'options', label: 'Options', class: 'align-middle' },
    ];

    /**
     * Component references
     */
    public $refs!: {
        addMaintenancePopup: AddMaintenancePopup;
        errorPopup: ErrorPopup;
        deletePopup: DeleteMaintenancePopup;
    };

    /**
     * The vehicle being displayed
     */
    @Prop()
    public vehicle!: Vehicle;

    public maintenance: Maintenance[] = [];

    public isBusy: boolean = false;

    public deleteId: number = -1;

    /**
     * On page load, pull in the vehicle.
     */
    public async created(): Promise<void> {
        EventBus.emit('loading');
        this.isBusy = true;
        this.maintenance = await this.$maintenanceStore.getMaintenanceForVehicle(this.vehicle);
        this.isBusy = false;
        EventBus.emit('loaded');
    }

    public async onAddClick() {
        this.$refs.addMaintenancePopup.show();
    }

    public async onMaintenanceAdd(maintenance: Maintenance) {
        await this.$maintenanceStore.addMaintenanceForVehicle(this.vehicle, maintenance);
    }

    public async onDeleteClick(id: number) {
        this.deleteId = id;
        this.$refs.deletePopup.show();
    }

    public async onDelete() {
        EventBus.emit('loading');
        this.isBusy = true;
        await this.$maintenanceStore.deleteMaintenanceForVehicle(this.vehicle, this.maintenance.find((m) => m.id === this.deleteId)!);
        this.deleteId = -1;
        this.isBusy = false;
        EventBus.emit('loaded');
    }

    /**
     * User wants to go to the information page of the maintenance.
     */
    public async onRowClick(item: any, index: number, event: any) {
        // Allows the user to click the options button without trigger it.
        if (this.deleteId !== -1) {
            return;
        }

        this.$router.push({ name: 'maintenance', params: { maintenanceId: this.maintenance[index].id! } as any });
    }
}
</script>