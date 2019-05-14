<style lang="scss">
</style>

<template>
    <page-content>
        <error-popup ref="errorPopup"/>
        <add-vehicle-popup ref="addPopup" @add="onVehicleAdd"/>
        <delete-vehicle-confirm-popup ref="deletePopup" @delete="onDelete"/>

        <div
            slot="tool-bar"
            class="d-flex flex-row align-items-center justify-content-between w-100"
        >
            <div class="text-muted">
                <span class="text-muted">Vehicles</span>
            </div>

            <div>
                <div class="d-inline-block pb2 pb-sm-0 pr-2">
                    <!-- Button on screen -->
                </div>
            </div>
        </div>

        <card-container style="height: auto!important;">
            <div class="mb-3 clearfix">
                <h2 class="float-left">Vehicles</h2>

                <b-btn
                    class="float-right"
                    variant="success"
                    @click="onAddClick"
                    style="height: 40px"
                    :disabled="isAddDisabled"
                >
                    <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                    <span style="vertical-align: middle;">Add Vehicle</span>
                </b-btn>
            </div>

            <b-table
                :fields="columnNames"
                :items="vehicles"
                :busy="isLoading"
                hover
                @row-clicked="onRowClick"
                tbodyTrClass="cursor-pointer"
            >
                <template slot="name" slot-scope="row">{{ row.value }}</template>
                <template slot="year" slot-scope="row">{{ row.value }}</template>
                <template slot="make" slot-scope="row">{{ row.value }}</template>
                <template slot="model" slot-scope="row">{{ row.value }}</template>
                <template slot="mileage" slot-scope="row">{{ row.value | number }}</template>
                <template slot="color" slot-scope="row">{{ row.value }}</template>
                <template slot="vin" slot-scope="row">{{ row.value }}</template>
                <template slot="licensePlate" slot-scope="row">{{ row.value }}</template>
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
    </page-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import MaterialIcon from '@/core/components/material-icon.vue';
import AddVehiclePopup from '@/vehicle-system/vehicle/components/popups/add-vehicle-popup.vue';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import CardContainer from '@/core/components/cards/card-container.vue';
import { User } from '@/user-system/entities/user';
import ToolBar from '../components/tool-bar/tool-bar.vue';
import PageContent from '@/core/components/layout/page-content.vue';
import { EventBus } from '@/core/event/event-bus';
import DeleteVehicleConfirmPopup from '@/vehicle-system/vehicle/components/popups/delete-vehicle-confirm-popup.vue';
import { UnitSystem } from '@/vehicle-system/common/unit-system';

/**
 * Garage page.
 */
@Component({
    name: 'vehicles',
    components: {
        MaterialIcon,
        AddVehiclePopup,
        ErrorPopup,
        CardContainer,
        PageContent,
        DeleteVehicleConfirmPopup,
    },
})
export default class Vehicles extends VehicleMixin {
    public readonly columnNames = [
        { key: 'name', label: 'Nickname', class: 'align-middle', sortable: true },
        { key: 'year', label: 'Year', class: 'align-middle', sortable: true },
        { key: 'make', label: 'Make', class: 'align-middle', sortable: true, formatter: (val: { name: string }) => val.name },
        { key: 'model', label: 'Model', class: 'align-middle', formatter: (val: { name: string }) => val.name },
        { key: 'odometer', label: 'Odometer', class: 'align-middle' },
        { key: 'color', label: 'Color', class: 'align-middle' },
        { key: 'vin', label: 'VIN', class: 'align-middle' },
        { key: 'licensePlate', label: 'License plate', class: 'align-middle' },
        { key: 'options', label: 'Options', class: 'align-middle' },
    ];

    /**
     * References to children components.
     */
    public $refs!: {
        addPopup: AddVehiclePopup;
        errorPopup: ErrorPopup;
        deletePopup: DeleteVehicleConfirmPopup;
    };

    /**
     * If the add button is enabled or not.
     */
    public isAddDisabled: boolean = false;

    /**
     * The vehicles being displayed
     */
    public vehicles: Vehicle[] = [];

    public isLoading: boolean = false;

    public deleteId: number = -1;

    /**
     * Event handler for when the component is mounted.
     */
    public async mounted(): Promise<void> {
        EventBus.emit('loading');
        this.isLoading = true;
        this.vehicles = await this.$vehicleStore.getVehicles();
        this.isAddDisabled = this.vehicles.length >= User.CURRENT!.subscription.plan.vehicleCount;

        this.isLoading = false;
        EventBus.emit('loaded');
    }

    public async onRowClick(item: any, index: number, event: any) {
        if (this.deleteId !== -1) {
            return;
        }

        this.$router.push({ name: 'vehicle-information', params: { vehicleId: this.vehicles[index].id! } as any });
    }

    public onAddClick(): void {
        this.$refs.addPopup.show();
    }

    public async onVehicleAdd(vehicle: Vehicle): Promise<void> {
        EventBus.emit('loading');
        this.isLoading = true;
        try {
            await this.$vehicleStore.addVehicle(vehicle);
        } catch (error) {
            EventBus.emit('error', error.message);
        }
        this.isLoading = false;
        EventBus.emit('loaded');
    }

    public onDeleteClick(id: number): void {
        this.deleteId = id;
        this.$refs.deletePopup.show();
    }

    public async onDelete(): Promise<void> {
        EventBus.emit('loading');
        this.isLoading = true;

        try {
            const index = this.vehicles.findIndex((v) => v.id === this.deleteId);
            await this.$vehicleStore.deleteVehicle(this.vehicles[index]);
        } catch (error) {
            this.$refs.errorPopup.show(error.message);
        }

        this.deleteId = -1;
        this.isLoading = false;
        EventBus.emit('loaded');
        this.isAddDisabled = this.vehicles.length >= User.CURRENT!.subscription.plan.vehicleCount;
    }
}
</script>