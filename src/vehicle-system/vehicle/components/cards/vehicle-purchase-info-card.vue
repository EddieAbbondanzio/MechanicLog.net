<style lang="scss" scoped>
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.vehicle-purchase-info-edit {
    &:hover {
        background-color: $gray-200 !important;
    }
    &:active {
        background-color: $gray-300 !important;
    }
}
</style>

<template>
    <card-container>
        <a href="#" @click="onEditClick">
            <material-icon
                icon="edit"
                color="muted"
                size="md"
                class="float-right vehicle-detail-edit p-1 rounded"
            />
        </a>

        <h4>Purchase Info
            <br>
            <small class="text-muted">{{ vehicle.mileage.toLocaleString() }} Miles</small>
        </h4>

        <div class="row">
            <div class="col-1 text-muted">Year</div>
            <div class="col-5">{{ vehicle.year }}</div>
            <div class="col-1 text-muted">Color</div>
            <div class="col-5">{{ vehicle.color }}</div>
        </div>
        <div class="row">
            <div class="col-1 text-muted">Make</div>
            <div class="col-5">{{ vehicle.make.name }}</div>
            <div class="col-1 text-muted">Plate</div>
            <div class="col-5">{{ vehicle.licensePlate }}</div>
        </div>
        <div class="row">
            <div class="col-1 text-muted">Model</div>
            <div class="col-5">{{ vehicle.model.name }}</div>
            <div class="col-1 text-muted">VIN</div>
            <div class="col-5">{{ vehicle.vin }}</div>
        </div>

        <!-- <edit-vehicle-popup :vehicle="vehicle" ref="editPopup" @edit="onEdit"/> -->
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
 * Card that shows off the purchase information
 */
@Component({
    name: 'vehicle-details-card',
    components: {
        CardContainer,
        MaterialIcon,
        EditVehiclePopup,
    },
})
export default class VehiclePurchaseInfoCard extends VehicleMixin {
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
        this.$emit('edit', vehicle);
    }
}
</script>