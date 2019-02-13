<style>
.h-40px {
    height: 40px;
    vertical-align: bottom;
}
</style>

<template>
    <private-master-page>
        <!-- Header -->
        <div class="row" slot="header">
            <div class="col-12" style="height: 64px;">
                <!-- Page Title -->
                <h1 class="d-inline-block" style="margin-top: 8px; margin-bottom: 8px;">My Vehicles</h1>

                <!-- Vehicle Controls -->
                <div class="float-right">
                    <div class="d-inline-block h-40px mr-2" style="margin-top: 12px;">
                        <add-vehicle-form/>
                    </div>

                    <div class="d-inline-block ml-2">
                        <div class="input-group h-40px" style="width: 320px;">
                            <div class="input-group-prepend">
                                <label
                                    class="input-group-text border-0 bg-primary text-light"
                                    for="inputGroupSelect01"
                                >Order By:</label>
                            </div>
                            <select
                                class="custom-select border-0 bg-white"
                                id="inputGroupSelect01"
                                @change="onOrderByChanged"
                            >
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

        <!-- Vehicles -->
        <vehicle-summary v-for="vehicle in vehicles" :vehicle="vehicle"/>
    </private-master-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PrivateMasterPage from '@/core/components/private/private-master-page.vue';
import { Vehicle } from '@/garage/entities/vehicle';
import VehicleSummary from '@/garage/components/vehicle-summary.vue';
import MaterialIcon from '@/core/components/shared/material-icon.vue';
import AddVehicleForm from '@/garage/components/add-vehicle-form.vue';
import { VehicleMixin } from '@/garage/mixins/vehicle-mixin';

/**
 * Garage page.
 */
@Component({
    name: 'garage',
    components: {
        PrivateMasterPage,
        VehicleSummary,
        MaterialIcon,
        AddVehicleForm,
    },
})
export default class Garage extends VehicleMixin {
    public vehicles: Vehicle[] = [];

    public async mounted(): Promise<void> {
        this.vehicles = await this.$getVehicles();
    }

    /**
     * Event handler to process when the user wants to change how their ordering
     * their vehicles by.
     */
    public onOrderByChanged(event: any): void {
        switch (event.target.value) {
            case 'Name':
                this.vehicles.sort((a: Vehicle, b: Vehicle) => {
                    const aName: string = a.name || '';
                    const bName: string = b.name || '';

                    return aName.localeCompare(bName);
                });
                break;

            case 'Year':
                this.vehicles.sort((a: Vehicle, b: Vehicle) => a.year > b.year ? -1 : 1);
                break;

            case 'Make':
                this.vehicles.sort((a: Vehicle, b: Vehicle) => a.make.localeCompare(b.make));
                break;

            case 'Mileage':
                this.vehicles.sort((a: Vehicle, b: Vehicle) => a.mileage > b.mileage ? -1 : 1);
                break;
        }
    }
}
</script>