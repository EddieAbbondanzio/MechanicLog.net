<style lang="scss">

</style>

<template>
    <div>hello there!</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PrivateMasterPage from "@/core/components/private/private-master-page.vue";
import { Vehicle } from "@/vehicle-system/vehicle/entities/vehicle";
import VehicleSummary from "@/vehicle-system/vehicle/components/vehicle-summary.vue";
import MaterialIcon from "@/core/components/shared/material-icon.vue";
import AddVehicleForm from "@/vehicle-system/vehicle/components/add-vehicle-form.vue";
import { VehicleMixin } from "@/vehicle-system/vehicle/mixins/vehicle-mixin";

/**
 * Garage page.
 */
@Component({
    name: "garage",
    components: {
        PrivateMasterPage,
        VehicleSummary,
        MaterialIcon,
        AddVehicleForm
    }
})
export default class Garage extends VehicleMixin {
    // public vehicles: Vehicle[] = [];
    // public async mounted(): Promise<void> {
    //     this.vehicles = await this.$getVehicles();
    // }
    // /**
    //  * Event handler to process when the user wants to change how their ordering
    //  * their vehicles by.
    //  */
    // public onOrderByChanged(event: any): void {
    //     switch (event.target.value) {
    //         case "Name":
    //             this.vehicles.sort((a: Vehicle, b: Vehicle) => {
    //                 const aName: string = a.name || "";
    //                 const bName: string = b.name || "";
    //                 return aName.localeCompare(bName);
    //             });
    //             break;
    //         case "Year":
    //             this.vehicles.sort((a: Vehicle, b: Vehicle) =>
    //                 a.year > b.year ? -1 : 1
    //             );
    //             break;
    //         case "Make":
    //             this.vehicles.sort((a: Vehicle, b: Vehicle) =>
    //                 a.make.localeCompare(b.make)
    //             );
    //             break;
    //         case "Mileage":
    //             this.vehicles.sort((a: Vehicle, b: Vehicle) =>
    //                 a.mileage > b.mileage ? -1 : 1
    //             );
    //             break;
    //     }
    // }
}
</script>