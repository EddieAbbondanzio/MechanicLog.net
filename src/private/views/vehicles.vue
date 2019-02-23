<style lang="scss">
</style>

<template>
    <div class="container-fluid px-0">
        <!-- Header -->
        <div class="row pt-3">
            <div class="col-12 col-lg-6">
                <p class="text-muted py-2 px-4" style="font-size: 1.25em;">
                    Vehicle records allow for tracking maintenace, and or repairs.
                </p>
            </div>

            <div class="col-12 col-lg-6">
                <div class="float-right d-inline-block">
                    <div class="d-inline-block pb2 pb-sm-0 pr-2">
                        <add-vehicle-form/>
                    </div>

                    <div class="d-inline-block align-middle">

                        <!-- Sort By -->
                        <div class="input-group" style="height: 40px;">
                            <div class="input-group-prepend">
                                <label
                                    class="input-group-text bg-primary text-light"
                                    for="inputGroupSelect01"
                                >Order By:</label>
                            </div>
                            <select
                                class="custom-select bg-white border-muted border-rounded-0"
                                style="height: 40px;"
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

        <!-- Sexy HR -->
        <div class="row">
            <div class="col-12 pb-2">
                <!-- <hr style="height: 4px; border: none;" class="bg-light"> -->
                <span class="text-muted">VEHICLES</span>
            </div>
        </div>

        <div class="row pb-2">
            <div class="col-10 col-lg-11">
                <div class="row">
                    <div class="col-2">
                        <span>Nickname</span>
                    </div>

                    <div class="col-4 col-lg-3">
                        <span>Year/Make/Model</span>
                    </div>

                    <div class="col-3 col-lg-2">
                        <span>Mileage</span>
                    </div>

                    <div class="col-2">
                        <span>Color</span>
                    </div>

                    <div class="col-2 d-none d-lg-block">
                        <span>VIN</span>
                    </div>

                    <div class="col-1 d-none d-lg-block">
                        <span>Plate</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 py-0 my-0">
                <hr class="my-0 py-0 bg-secondary" style="height 4px;">
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <vehicle-summary
                    v-for="vehicle in vehicles"
                    :vehicle="vehicle"
                    :key="vehicle.name"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import VehicleSummary from '@/vehicle-system/vehicle/components/vehicle-summary.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import AddVehicleForm from '@/vehicle-system/vehicle/components/add-vehicle-form.vue';
import { VehicleMixin } from '@/vehicle-system/vehicle/mixins/vehicle-mixin';

/**
 * Garage page.
 */
@Component({
    name: 'vehicles',
    components: {
        VehicleSummary,
        MaterialIcon,
        AddVehicleForm,
    },
})
export default class Vehicles extends VehicleMixin {
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
                this.vehicles.sort((a: Vehicle, b: Vehicle) =>
                    a.year > b.year ? -1 : 1
                );
                break;
            case 'Make':
                this.vehicles.sort((a: Vehicle, b: Vehicle) =>
                    a.make.localeCompare(b.make)
                );
                break;
            case 'Mileage':
                this.vehicles.sort((a: Vehicle, b: Vehicle) =>
                    a.mileage > b.mileage ? -1 : 1
                );
                break;
        }
    }
}
</script>