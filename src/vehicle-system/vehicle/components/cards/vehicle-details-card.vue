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
    <card-container style="position: relative;">
        <div
            class="bg-info d-flex align-items-center justify-content-center text-light"
            style="position: absolute; left: 0px; top: 0px; bottom: 0px; width: 96px;"
            title="Details"
        >
            <material-icon icon="info" color="light" size="lg"/>
        </div>
        <div style="margin-left: 96px;">
            <h4>
                Details
                <br>
                <small class="text-muted">{{ vehicle.odometer | number }} Miles</small>
            </h4>

            <div class="row">
                <div class="col-2 text-muted">Year</div>
                <div class="col-4">{{ vehicle.year }}</div>
                <div class="col-2 text-muted">Color</div>
                <div class="col-4">{{ vehicle.color }}</div>
            </div>
            <div class="row">
                <div class="col-2 text-muted">Make</div>
                <div class="col-4">{{ vehicle.make.name }}</div>
                <div class="col-2 text-muted">Plate</div>
                <div class="col-4">{{ vehicle.licensePlate }}</div>
            </div>
            <div class="row">
                <div class="col-2 text-muted">Model</div>
                <div class="col-4">{{ vehicle.model.name }}</div>
                <div class="col-2 text-muted">VIN</div>
                <div class="col-4">{{ vehicle.vin }}</div>
            </div>

            <edit-vehicle-popup :vehicle="vehicle" ref="editPopup" @edit="onEdit"/>
        </div>
    </card-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardContainer from '@/core/components/cards/card-container.vue';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import MaterialIcon from '@/core/components/material-icon.vue';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import EditVehiclePopup from '@/vehicle-system/vehicle/components/popups/edit-vehicle-popup.vue';

/**
 * Card that shows off the details of a vehicle.
 */
@Component({
    name: 'vehicle-details-card',
    components: {
        CardContainer,
        MaterialIcon,
        EditVehiclePopup,
    },
})
export default class VehicleDetailsCard extends VehicleMixin {
    public $refs!: {
        editPopup: EditVehiclePopup;
    };

    /**
     * The vehicle of the card.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * Event handler for when the user wants to edit the vehicle details.
     */
    public async onEditClick(): Promise<void> {
        this.$refs.editPopup.show();
    }

    /**
     * Event handler for when the popup finishes editing.
     */
    public async onEdit(vehicle: Vehicle): Promise<void> {
        await this.$vehicleStore.updateVehicle(vehicle);
        this.$emit('edit', vehicle);
    }
}
</script>