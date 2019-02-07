<template>
    <private-master-page>
        <!-- Header -->
        <div class="row" slot="header">
            <modal-popup id="fuck" title="Add New Vehicle">
                REEEE
            </modal-popup>

            <div class="col-md-6 col-lg-2 my-auto">
                <h1 class="d-inline-block">My Vehicles</h1>
            </div>

            <div class="col-md-1 my-auto">
                <!-- Add Vehicle Button -->
                <modal-trigger-button color="success" target="fuck">
                    <material-icon icon="add" size="md" />
                    Add Vehicle
                </modal-trigger-button>
            </div>

            <div class="offset-md-1 offset-lg-6 col-md-4 col-lg-3 my-auto">
                <div class="input-group">
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

        <!-- Vehicles -->
        <vehicle-summary v-for="vehicle in vehicles" :vehicle="vehicle" :key="vehicle.name"/>
    </private-master-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PrivateMasterPage from '@/core/components/private/private-master-page.vue';
import { Vehicle } from '@/garage/entities/vehicle';
import VehicleSummary from '@/garage/components/vehicle-summary.vue';
import ModalTriggerButton from '@/core/components/shared/modal/modal-trigger-button.vue';
import ModalPopup from '@/core/components/shared/modal/modal-popup.vue';
import MaterialIcon from '@/core/components/shared/material-icon.vue';

/**
 * Garage page.
 */
@Component({
    name: 'garage',
    components: {
        PrivateMasterPage,
        VehicleSummary,
        ModalPopup,
        ModalTriggerButton,
        MaterialIcon,
    },
})
export default class Garage extends Vue {
    public vehicles: Vehicle[] = [
        new Vehicle('Daily Driver', 1993, 'Honda', 'Civic', 122000),
        new Vehicle('Winter Beater', 2000, 'Jeep', 'Cherokee', 165769),
    ];

    /**
     * Event handler to process when the user wants to change how their ordering
     * their vehicles by.
     */
    public onOrderByChanged(event: any): void {
        switch (event.target.value) {
            case 'Name':
                this.vehicles.sort((a: Vehicle, b: Vehicle) => a.name.localeCompare(b.name));
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