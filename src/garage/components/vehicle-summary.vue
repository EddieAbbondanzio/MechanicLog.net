<style lang="scss">
@import "./public/bootstrap/_functions.scss";
@import "./public/bootstrap/_variables.scss";

.vehicle-summary {
    height: 150px;
}

.vehicle-options-button:hover {
    background-color: $gray-300;
    cursor: pointer;
}
.vehicle-options-button:active {
    background-color: $gray-400;
    cursor: pointer;
}
</style>

<template>
    <div class="row mb-4 vehicle-summary m-0 bg-light rounded">
        <delete-vehicle-confirm-popup ref="deletePopup" @delete="onDelete"/>
        <edit-vehicle-popup ref="editPopup" :vehicle="vehicle" @edit="onEdit" />

        <!-- Background -->
        <div class="col-11">
            <!-- Title Row -->
            <div class="row">
                <div class="col-12 my-2">
                    <h3>{{ title }}</h3>
                </div>
            </div>

            <!-- Information -->
            <div class="row">
                <div class="col-11">
                    <div class="row">
                        <div class="col-3">
                            <ul class="list-unstyled">
                                <!-- Mileage -->
                                <li>
                                    <h5>
                                        <span class="text-dark">Mileage:&nbsp;</span>
                                        <span class="text-muted">{{ vehicle.mileage }}</span>
                                    </h5>
                                </li>
                                <!-- Color -->
                                <li v-if="vehicle.color != null">
                                    <h5>
                                        <span class="text-dark">Color:&nbsp;</span>
                                        <span class="text-muted">{{ vehicle.color }}</span>
                                    </h5>
                                </li>
                            </ul>
                        </div>
                        <div class="col-3">
                            <ul class="list-unstyled">
                                <!-- License Plate -->
                                <li v-if="vehicle.licensePlate != null">
                                    <h5>
                                        <span class="text-dark">License Plate:&nbsp;</span>
                                        <span class="text-muted">{{ vehicle.licensePlate }}</span>
                                    </h5>
                                </li>
                                <!-- VIN -->
                                <li v-if="vehicle.vin != null">
                                    <h5>
                                        <span class="text-dark">VIN:&nbsp;</span>
                                        <span class="text-muted">{{ vehicle.vin }}</span>
                                    </h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Options Button -->
        <div class="col-1 pr-0 vehicle-options-button">
            <b-dropdown variant="link" no-caret>
                <div slot="button-content" style="margin-top: 55px;">
                    <material-icon icon="more_vert" size="md" color="dark"/>
                </div>

                <b-dropdown-item href="#" @click="onEditClick">Edit</b-dropdown-item>
                <b-dropdown-item href="#" class="text-danger" @click="onDeleteClick">Delete</b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Vehicle } from '../entities/vehicle';
import MaterialIcon from '@/core/components/shared/material-icon.vue';
import DeleteVehicleConfirmPopup from '@/garage/components/delete-vehicle-confirm-popup.vue';
import EditVehiclePopup from '@/garage/components/edit-vehicle-popup.vue';
import { VehicleMixin } from '@/garage/mixins/vehicle-mixin';

/**
 * Component that summarizes the details of a vehicle.
 */
@Component({
    name: 'vehicle-summary',
    components: {
        MaterialIcon,
        DeleteVehicleConfirmPopup,
        EditVehiclePopup,
    },
})
export default class VehicleSummary extends VehicleMixin {
    /**
     * The vehicle being rendered.
     */
    @Prop()
    public vehicle!: Vehicle;

    public get title() {
        if (this.vehicle.name != null) {
            return `${this.vehicle.name} - ${this.vehicle.year} ${this.vehicle.make} ${this.vehicle.model}`;
        } else {
            return `${this.vehicle.year} ${this.vehicle.make} ${this.vehicle.model}`;
        }
    }

    /**
     * Convert the date into a print friendly string.
     */
    public toDisplayDate(date: Date): string {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    /**
     * User wants to edit the vehicle.
     */
    protected async onEditClick(): Promise<void> {
        (this.$refs.editPopup as any).show();
    }

    /**
     * User wants to delete the vehicle.
     */
    protected async onDeleteClick(): Promise<void> {
        (this.$refs.deletePopup as any).show();
    }

    /**
     * User clicked the confirm delete of the popup. Go ahead and delete
     * this sucker.
     */
    protected async onDelete(): Promise<void> {
        await this.$deleteVehicle(this.vehicle);
    }

    /**
     * Update the vehicle.
     */
    protected async onEdit(newVehicle: Vehicle): Promise<void> {
        await this.$updateVehicle(newVehicle);
        console.log(this.vehicle);
    }
}
</script>
