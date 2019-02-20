<style>
.h-40px {
    height: 40px;
    vertical-align: bottom;
}
</style>

<template>
    <private-master-page title="Maintenance">
        <!-- Header -->
        <div class="row" slot="header">
            <div class="col-12" style="height: 64px;">
                <!-- Page Title -->
                <h1
                    class="d-inline-block"
                    style="margin-top: 8px; margin-bottom: 8px;"
                >Maintenance History</h1>

                <!-- Vehicle Controls -->
                <div class="float-right">
                    <div class="d-inline-block h-40px mr-2" style="margin-top: 12px;">
                        <b-btn variant="success">
                            <material-icon icon="add" size="md"/>Add Maintenance
                        </b-btn>
                    </div>

                    <div class="d-inline-block ml-2">
                        <div class="input-group h-40px" style="width: 320px;">
                            <div class="input-group-prepend">
                                <label
                                    class="input-group-text border-0 bg-primary text-light"
                                    for="inputGroupSelect01"
                                >Order By:</label>
                            </div>
                            <select class="custom-select border-0 bg-white" id="inputGroupSelect01">
                                <option selected>Name</option>
                                <option value="Year">Year</option>
                                <option value="Make">Make</option>
                                <option value="Mileage">Mileage</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="row m-0 bg-light rounded">
            <div class="col-12">
                <maintenance-history/>
            </div>
        </div>
    </private-master-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PrivateMasterPage from '@/core/components/private/private-master-page.vue';
import { VehicleMixin } from '@/vehicle-system/vehicle/mixins/vehicle-mixin';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import MaintenanceHistory from '@/vehicle-system/maintenance/components/maintenance-history.vue';
import MaterialIcon from '@/core/components/shared/material-icon.vue';

/**
 * Maintenance history page.
 */
@Component({
    name: 'maintenance',
    components: {
        PrivateMasterPage,
        MaintenanceHistory,
        MaterialIcon,
    },
})
export default class NewComponent extends VehicleMixin {
    /**
     * The active vehicle being modified.
     */
    public vehicle!: Vehicle;

    /**
     * On page load, pull in the vehicle.
     */
    public async mounted(): Promise<void> {
        const vehicleId: number = Number.parseInt(this.$route.params.vehicleId, 10);
        this.vehicle = (await this.$getVehicles()).find((v) => v.id === vehicleId)!;
    }
}
</script>