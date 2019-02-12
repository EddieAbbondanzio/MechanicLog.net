<style lang="scss">
@import "./public/bootstrap/_functions.scss";
@import "./public/bootstrap/_variables.scss";

.maintenace-link {
    display: flex;
    justify-content: center;
    align-items: center;
}

.maintenace-link a {
    font-size: 1.5rem;
}

.maintennace-link i {
    vertical-align: middle;
}

.vehicle-options-button {
    height: 150px;
    line-height: 150px;
    width: 74px;
    vertical-align: super;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
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
    <div class="row mb-4">
        <delete-vehicle-confirm-popup ref="popup" @delete="onDelete"/>

        <div class="col-lg-12" v-if="vehicle != null">
            <div class="bg-light rounded" style="height: 150px;">
                <!-- Vehicle Details -->
                <div
                    class="px-4 py-3 clearfix d-inline-block"
                    style="height: 150px; width: calc(100% - 74px);"
                >
                    <div class="d-inline-block">
                        <h3
                            class="text-left text-dark d-inline-block"
                        >{{ vehicle.name || vehicleYearMakeModel }}</h3>

                        <ul class="list-unstyled text-muted">
                            <li>
                                <h5>{{ vehicleYearMakeModel }}</h5>
                            </li>
                            <li>
                                <h5>Mileage: {{ vehicle.mileage.toLocaleString() }}</h5>
                            </li>
                        </ul>
                    </div>

                    <!-- Maintenace Link -->
                    <div class="float-right maintenace-link h-100">
                        <div>
                            <a class="link-info" href="#">
                                <i class="material-icons">settings</i> Maintenance
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Options Button -->
                <div
                    class="float-right text-center py-0"
                    style="text-align: center; vertical-align: middle; height: 150px;"
                >
                    <b-dropdown variant="link" no-caret>
                        <div slot="button-content" style="margin-top: 55px;">
                            <material-icon icon="more_vert" size="md" color="dark"/>
                        </div>

                        <b-dropdown-item href="#">Edit</b-dropdown-item>
                        <b-dropdown-item href="#" class="text-danger" @click="onDeleteClick">Delete</b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Vehicle } from '../entities/vehicle';
import MaterialIcon from '@/core/components/shared/material-icon.vue';
import DeleteVehicleConfirmPopup from '@/garage/components/delete-vehicle-confirm-popup.vue';
import { VehicleMixin } from '@/garage/mixins/vehicle-mixin';

/**
 * Component that summarizes the details of a vehicle.
 */
@Component({
    name: 'vehicle-summary',
    components: {
        MaterialIcon,
        DeleteVehicleConfirmPopup,
    },
})
export default class VehicleSummary extends VehicleMixin {
    /**
     * The vehicle being rendered.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The year make model of the vehicle.
     */
    public get vehicleYearMakeModel() {
        return `${this.vehicle.year} ${this.vehicle.make} ${this.vehicle.model}`;
    }

    /**
     * Convert the date into a print friendly string.
     */
    public toDisplayDate(date: Date): string {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    public async onDeleteClick(): Promise<void> {
        (this.$refs.popup as any).show();
    }

    /**
     * User clicked the confirm delete of the popup. Go ahead and delete
     * this sucker.
     */
    protected async onDelete(): Promise<void> {
        await this.$deleteVehicle(this.vehicle);
    }
}
</script>
