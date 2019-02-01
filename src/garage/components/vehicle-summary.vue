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
        <div class="col-lg-12" v-if="vehicle != null">
            <div class="bg-light rounded" style="height: 150px;">
                <!-- Vehicle Details -->
                <div class="px-4 py-3 clearfix d-inline-block" style="height: 150px; width: calc(100% - 74px);">
                    <div class="d-inline-block">
                        <h3 class="text-left text-dark d-inline-block">{{ vehicle.name }}</h3>

                        <ul class="list-unstyled text-muted">
                            <li>
                                <h5>{{ vehicle.year }} {{ vehicle.make }} {{ vehicle.model }}</h5>
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
                            <br>
                            <!-- <span
                                class="text-muted"
                                v-if="vehicle.lastMaintenaceDate != null"
                            >Last maintenance on: {{ toDisplayDate(vehicle.lastMaintenaceDate) }}</span> -->
                        </div>
                    </div>
                </div>

                <!-- Options Button -->
                <div class="float-right btn vehicle-options-button text-center py-0">
                    <i class="material-icons icon-md">more_vert</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Vehicle } from '../entities/vehicle';

/**
 * Component that summarizes the details of a vehicle.
 */
@Component({
    name: 'vehicle-summary',
})
export default class VehicleSummary extends Vue {
    /**
     * The vehicle being rendered.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * Convert the date into a print friendly string.
     */
    public toDisplayDate(date: Date): string {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
}
</script>
