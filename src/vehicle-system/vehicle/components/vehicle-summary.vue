<style lang="scss">
@import "./public/bootstrap/_functions.scss";
@import "./public/bootstrap/_variables.scss";

.vehicle-summary {
    cursor: pointer;

    &:hover {
        background-color: $gray-200;
        color: $gray-900 !important;
    }

    &:active {
        background-color: $gray-300;
    }
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
    <div class="row">
        <div class="col-12">
            <div class="row">
                <router-link
                    class="text-muted vehicle-summary col-10 col-lg-11"
                    :to="{ name: 'maintenance', params: { vehicleId: vehicle.id }}"
                >
                    <!-- Columns -->
                    <div class="row">
                        <div class="col-2 py-2">
                            <span style="line-height: 39px;">{{ vehicle.name }}</span>
                        </div>

                        <div class="col-4 col-lg-3 py-2">
                            <span
                                style="line-height: 39px;"
                            >{{ vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model}}</span>
                        </div>

                        <div class="col-3 col-lg-2 py-2">
                            <span style="line-height: 39px;">{{ vehicle.mileage.toLocaleString() }}</span>
                        </div>

                        <div class="col-2 py-2">
                            <span style="line-height: 39px;">{{ vehicle.color }}</span>
                        </div>

                        <div class="col-2 py-2 d-none d-lg-block">
                            <span style="line-height: 39px;">{{ vehicle.vin }}</span>
                        </div>

                        <div class="col-1 py-2 d-none d-lg-block">
                            <span style="line-height: 39px;">{{ vehicle.licensePlate }}</span>
                        </div>
                    </div>
                </router-link>

                <!-- More Options Button -->
                <div class="col-2 col-lg-1 py-2 vehicle-options-button text-center d-table align-middle">
                    <div class="d-table-cell">
                        <b-dropdown variant="link" no-caret>
                            <div slot="button-content">
                                <material-icon
                                    icon="more_vert"
                                    size="md"
                                    color="dark"
                                    class="align-middle"
                                />
                            </div>

                            <b-dropdown-item href="#" @click="onEditClick">Edit</b-dropdown-item>
                            <b-dropdown-item
                                href="#"
                                class="text-danger"
                                @click="onDeleteClick"
                            >Delete</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <hr class="my-0 py-0">
                </div>
            </div>
        </div>

        <delete-vehicle-confirm-popup ref="deletePopup" @delete="onDelete"/>
        <edit-vehicle-popup ref="editPopup" :vehicle="vehicle" @edit="onEdit"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Vehicle } from "@/vehicle-system/vehicle/entities/vehicle";
import MaterialIcon from "@/core/components/material-icon.vue";
import DeleteVehicleConfirmPopup from "@/vehicle-system/vehicle/components/delete-vehicle-confirm-popup.vue";
import EditVehiclePopup from "@/vehicle-system/vehicle/components/edit-vehicle-popup.vue";
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';

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
        await this.$vehicleStore.deleteVehicle(this.vehicle);
    }

    /**
     * Update the vehicle.
     */
    protected async onEdit(newVehicle: Vehicle): Promise<void> {
        await this.$vehicleStore.updateVehicle(newVehicle);
    }
}
</script>
