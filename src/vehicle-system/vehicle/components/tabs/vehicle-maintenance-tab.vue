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
            <error-popup ref="errorPopup"/>
            <add-maintenance-popup ref="addPopup" :vehicle="vehicle" @add="onMaintenanceAdd"/>
            <delete-maintenance-confirm-popup ref="deletePopup" @delete="onDelete"/>

            <!-- Table Header -->
            <card-container>
                <div class="pb-3 clearfix">
                    <h2 class="float-left">Maintenance</h2>

                    <b-btn
                        variant="success"
                        @click="onAddClick"
                        style="height: 40px"
                        class="rounded float-right"
                    >
                        <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                        <span style="vertical-align: middle;">Add Maintenance</span>
                    </b-btn>
                </div>

                <b-table :fields="columnNames" :items="events" :busy="isBusy">
                    <template slot="odometer" slot-scope="row">{{ row.value | number }}</template>
                    <template slot="date" slot-scope="row">{{ row.value | date }}</template>
                    <template slot="mechanic" slot-scope="row">{{ row.value.name }}</template>
                    <template slot="services" slot-scope="row">{{ row.value }}</template>
                    <template slot="totalCost" slot-scope="row">{{ row.value | currency }}</template>
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
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Maybe } from '@/core/common/monads/maybe';
import { Nullable } from '@/core/common/monads/nullable';
import AddMaintenancePopup from '@/vehicle-system/vehicle/components/popups/add-maintenance-popup.vue';
import { MaintenanceService } from '@/vehicle-system/vehicle/entities/maintenance-service';
import { MaintenanceEvent } from '@/vehicle-system/vehicle/entities/maintenance-event';
import CardContainer from '@/core/components/cards/card-container.vue';
import VehicleDetailsCard from '@/vehicle-system/vehicle/components/cards/vehicle-details-card.vue';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import { MaintenanceEventStats } from '@/vehicle-system/vehicle/entities/maintenance-event-stats';
import { EventBus } from '@/core/event/event-bus';
import DeleteMaintenanceConfirmPopup from '@/vehicle-system/vehicle/components/popups/delete-maintenance-confirm-popup.vue';

/**
 * Maintenance history page.
 */
@Component({
    name: 'maintenance',
    components: {
        MaterialIcon,
        AddMaintenancePopup,
        CardContainer,
        VehicleDetailsCard,
        ErrorPopup,
        DeleteMaintenanceConfirmPopup,
    },
})
export default class VehicleMaintenanceTab extends VehicleMixin {
    public readonly columnNames = [
        { key: 'odometer', label: 'Odometer', class: 'align-middle', sortable: true },
        { key: 'date', label: 'Date', class: 'align-middle', sortable: true },
        { key: 'mechanic', label: 'Mechanic', class: 'align-middle', sortable: true },
        { key: 'services', label: 'Service(s)', class: 'align-middle', formatter: (val: MaintenanceService[]) => val.map((v) => v.description).join(', ') },
        { key: 'totalCost', label: 'Cost', class: 'align-middle', sortable: true },
        { key: 'options', label: 'Options', class: 'align-middle' },
    ];

    /**
     * Component references
     */
    public $refs!: {
        addPopup: AddMaintenancePopup;
        errorPopup: ErrorPopup;
        deletePopup: DeleteMaintenanceConfirmPopup;
    };
    /**
     * The maintenance events.
     */
    public events: MaintenanceEvent[] = [];
    /**
     * The vehicle being displayed
     */
    public vehicle: Nullable<Vehicle> = null;
    public stats: Nullable<MaintenanceEventStats> = null;

    public isBusy: boolean = false;

    public deleteId: number = -1;

    /**
     * On page load, pull in the vehicle.
     */
    public async created(): Promise<void> {
        EventBus.emit('loading');
        this.isBusy = true;

        const vehicleId: number = Number.parseInt(this.$route.params.vehicleId, 10);
        this.vehicle = await this.$vehicleStore.getVehicle(vehicleId);
        if (this.vehicle != null) {
            this.events = await this.$vehicleStore.getMaintenanceEvents(this.vehicle);
            this.stats = await this.$vehicleStore.getMaintenanceEventStats(this.vehicle);
        }

        this.isBusy = false;
        EventBus.emit('loaded');
    }

    /**
     * User clicked on the add maintenance button.
     */
    public onAddClick(): void {
        this.$refs.addPopup.show();
    }
    /**
     * Event handler for when a maintenance event is added to the vehicle.
     */
    public async onMaintenanceAdd(maintenance: MaintenanceEvent): Promise<void> {
        EventBus.emit('loading');
        this.isBusy = true;

        await this.$vehicleStore.addMaintenanceEvent(this.vehicle!, maintenance);
        this.events.push(maintenance);
        this.stats = await this.$vehicleStore.getMaintenanceEventStats(this.vehicle!);

        this.isBusy = false;
        EventBus.emit('loaded');
    }

    public onDeleteClick(id: number) {
        this.deleteId = id;
        this.$refs.deletePopup.show();
    }

    /**
     * Event handler for when the user wants to delete a event.
     */
    public async onDelete(): Promise<void> {
        EventBus.emit('loading');
        this.isBusy = true;

        const maintenance = this.events.find((e) => e.id === this.deleteId)!;
        const index = this.events.findIndex((m) => m.id === maintenance.id);

        try {
            await this.$vehicleStore.deleteMaintenanceEvent(this.vehicle!, maintenance);
            this.events.splice(index, 1);
        } catch (error) {
            this.$refs.errorPopup.show(error.message);
        }

        this.stats = await this.$vehicleStore.getMaintenanceEventStats(this.vehicle!);

        this.isBusy = false;
        EventBus.emit('loaded');
    }
}
</script>