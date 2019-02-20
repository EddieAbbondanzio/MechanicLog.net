<style lang="scss">
@import "./public/bootstrap/_functions.scss";
@import "./public/bootstrap/_variables.scss";

.vehicle-summary {
    height: 150px;
}

.vehicle-maintenance {
    cursor: pointer;
}

.vehicle-options-button {
    cursor: pointer;
    text-decoration: none !important;

    &:hover {
        background-color: $gray-200;
    }
    &:active {
        background-color: $gray-300;
    }
}
</style>

<template>
    <router-link
        class="row text-muted vehicle-maintenance py-2"
        :to="{ name: 'maintenance', params: { vehicleId: vehicle.id }}"
    >
        <div class="col-1">
            <span style="line-height: 39px;">{{ vehicle.name }}</span>
        </div>

        <div class="col-3">
            <span style="line-height: 39px;">{{ vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model}}</span>
        </div>

        <div class="col-2">
            <span style="line-height: 39px;">{{ vehicle.mileage.toLocaleString() }}</span>
        </div>

        <div class="col-2">
            <span style="line-height: 39px;">{{ vehicle.color }}</span>
        </div>

        <div class="col-2">
            <span style="line-height: 39px;">{{ vehicle.vin }}</span>
        </div>

        <div class="col-1">
            <span style="line-height: 39px;">{{ vehicle.licensePlate }}</span>
        </div>

        <div class="col-1">
            <b-dropdown variant="link" no-caret class="vehicle-options-button rounded">
                <div slot="button-content">
                    <material-icon icon="more_vert" size="md" color="dark" class="align-middle"/>
                </div>

                <b-dropdown-item href="#" @click="onEditClick">Edit</b-dropdown-item>
                <b-dropdown-item href="#" class="text-danger" @click="onDeleteClick">Delete</b-dropdown-item>
            </b-dropdown>
        </div>

        <div class="col-12 py-0 my-0 pt-2">
            <hr style="height: 2px; border: none;" class="bg-light m-0">
        </div>
    </router-link>

    <!-- <div class="row mb-4 vehicle-summary m-0 bg-white border rounded border-muted">
        <delete-vehicle-confirm-popup ref="deletePopup" @delete="onDelete"/>
        <edit-vehicle-popup ref="editPopup" :vehicle="vehicle" @edit="onEdit"/>

    </div>-->
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Vehicle } from "@/vehicle-system/vehicle/entities/vehicle";
import MaterialIcon from "@/core/components/shared/material-icon.vue";
import DeleteVehicleConfirmPopup from "@/vehicle-system/vehicle/components/delete-vehicle-confirm-popup.vue";
import EditVehiclePopup from "@/vehicle-system/vehicle/components/edit-vehicle-popup.vue";
import { VehicleMixin } from "@/vehicle-system/vehicle/mixins/vehicle-mixin";

/**
 * Component that summarizes the details of a vehicle.
 */
@Component({
    name: "vehicle-summary",
    components: {
        MaterialIcon,
        DeleteVehicleConfirmPopup,
        EditVehiclePopup
    }
})
export default class VehicleSummary extends VehicleMixin {
    /**
     * The vehicle being rendered.
     */
    @Prop()
    public vehicle!: Vehicle;

    public get title() {
        if (this.vehicle.name != null) {
            return `${this.vehicle.name} - ${this.vehicle.year} ${
                this.vehicle.make
            } ${this.vehicle.model}`;
        } else {
            return `${this.vehicle.year} ${this.vehicle.make} ${
                this.vehicle.model
            }`;
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
    }
}
</script>
