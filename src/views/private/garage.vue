<style lang="scss">
</style>


<template>
    <private-master-page>
        <!-- Header -->
        <div class="row" slot="header">
            <div class="col-md-6 col-lg-2 my-auto">
                <h1 class="d-inline-block">My Vehicles</h1>
            </div>

            <div class="col-md-1 my-auto">
                <button class="btn btn-success">
                    <i class="material-icons">add</i> Add Vehicle
                </button>
            </div>

            <div class="offset-md-1 offset-lg-6 col-md-4 col-lg-3 my-auto">
                <div class="input-group">
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

        <!-- Vehicles -->
        <vehicle-list/>
    </private-master-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PrivateMasterPage from '@/core/components/private/private-master-page.vue';
import VehicleList from '@/garage/components/vehicle-list/vehicle-list.vue';

/**
 * Garage page.
 */
@Component({
    name: 'garage',
    components: {
        PrivateMasterPage,
        VehicleList,
    },
})
export default class Garage extends Vue {
}
</script>