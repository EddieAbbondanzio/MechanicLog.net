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
            <add-maintenance-popup ref="addMaintenancePopup"/>
            <error-popup ref="errorPopup"/>

            <!-- Table Header -->
            <card-container>
                <div class="pb-3 clearfix">
                    <h2 class="float-left">Maintenance</h2>

                    <b-btn variant="success" style="height: 40px" class="rounded float-right">
                        <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                        <span style="vertical-align: middle;" @click="onAddClick">Add Maintenance</span>
                    </b-btn>
                </div>

                <b-table :fields="columnNames" :busy="isBusy">
                    <template slot="odometer" slot-scope="row">{{ row.value | number }}</template>
                    <template slot="date" slot-scope="row">{{ row.value | date }}</template>
                    <template slot="mechanic" slot-scope="row">{{ row.value.name }}</template>
                    <template slot="services" slot-scope="row">{{ row.value }}</template>
                    <template slot="totalCost" slot-scope="row">{{ row.value | currency }}</template>
                    <template slot="options">
                        <b-dropdown no-caret variant="link" class="maintenance-options">
                            <div slot="button-content">
                                <material-icon
                                    icon="more_vert"
                                    color="muted"
                                    size="md"
                                    class="align-middle m-0 p-0"
                                />
                            </div>

                            <b-dropdown-item href="#" class="text-danger">Delete</b-dropdown-item>
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
import CardContainer from '@/core/components/cards/card-container.vue';
import VehicleDetailsCard from '@/vehicle-system/vehicle/components/cards/vehicle-details-card.vue';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import { EventBus } from '@/core/event/event-bus';
import AddMaintenancePopup from '@/vehicle-system/vehicle/components/popups/add-maintenance-popup.vue';

/**
 * Maintenance history page.
 */
@Component({
    name: 'maintenance',
    components: {
        MaterialIcon,
        CardContainer,
        VehicleDetailsCard,
        ErrorPopup,
        AddMaintenancePopup,
    },
})
export default class VehicleMaintenanceTab extends VehicleMixin {
    public readonly columnNames = [
        { key: 'odometer', label: 'Odometer', class: 'align-middle', sortable: true },
        { key: 'date', label: 'Date', class: 'align-middle', sortable: true },
        { key: 'mechanic', label: 'Mechanic', class: 'align-middle', sortable: true },
        { key: 'totalCost', label: 'Cost', class: 'align-middle', sortable: true },
        { key: 'options', label: 'Options', class: 'align-middle' },
    ];

    /**
     * Component references
     */
    public $refs!: {
        addMaintenancePopup: AddMaintenancePopup;
        errorPopup: ErrorPopup;
    };
    /**
     * The vehicle being displayed
     */
    public vehicle: Nullable<Vehicle> = null;

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

        this.isBusy = false;
        EventBus.emit('loaded');
    }

    public async onAddClick() {
        this.$refs.addMaintenancePopup.show();
    }
}
</script>