<template>
    <div class="row px-3">
        <div class="col-12 px-0 mx-0">
            <card-container>
                <!-- Return to maintenance history link -->
                <div
                    class="d-flex flex-row align-items-center justify-content-between w-100 pb-3 border-bottom"
                >
                    <div class="text-muted">
                        <router-link :to="{ name: 'vehicle-maintenance'}" class="text-primary">
                            <material-icon
                                icon="keyboard_backspace"
                                color="primary"
                                class="align-middle"
                            />Back to Maintenance History
                        </router-link>
                    </div>
                </div>

                <div class="py-3" v-if="maintenance != null">
                    <div class="pb-5">
                        <h3 class="pb-3">{{ maintenance.description }}</h3>

                        <div class="row">
                            <div class="col-2 text-muted">Odometer:</div>
                            <div class="col-10">{{ maintenance.odometer }}</div>
                            <div class="col-2 text-muted">Date:</div>
                            <div class="col-10">{{ maintenance.date | date }}</div>
                        </div>
                    </div>

                    <maintenance-parts-table
                        v-bind:value="maintenance.getParts()"
                        :readonly="true"
                    />
                    <maintenance-labor-table
                        v-bind:value="maintenance.getLabor()"
                        :readonly="true"
                    />
                    <maintenance-others-table
                        v-bind:value="maintenance.getOther()"
                        :readonly="true"
                    />

                    <div>
                        <h3>Cost</h3>

                        <div class="row">
                            <div class="col-2 text-muted">Parts:</div>
                            <div class="col-10">{{ maintenance.cost.partsCost | currency }}</div>

                            <div class="col-2 text-muted">Labor:</div>
                            <div class="col-10">{{ maintenance.cost.laborCost | currency }}</div>

                            <div class="col-2 text-muted">Other:</div>
                            <div class="col-10">{{ maintenance.cost.otherCost | currency }}</div>
                        </div>

                        <div class="row">
                            <div class="col-2 text-muted">Total:</div>
                            <div
                                class="col-10 font-weight-bold"
                            >{{ maintenance.cost.totalCost | currency }}</div>
                        </div>
                    </div>
                </div>
            </card-container>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';
import CardContainer from '@/core/components/cards/card-container.vue';
import { Maintenance } from '../vehicle/entities/maintenance';
import { VehicleMixin } from '../vehicle/vehicle-mixin';
import { EventBus } from '@/core/event/event-bus';
import { Nullable } from '../../core/common/monads/nullable';
import { Vehicle } from '../vehicle/entities/vehicle';
import MaintenancePartsTable from '@/vehicle-system/vehicle/components/tables/maintenance-parts-table.vue';
import MaintenanceLaborTable from '@/vehicle-system/vehicle/components/tables/maintenance-labor-table.vue';
import MaintenanceOthersTable from '@/vehicle-system/vehicle/components/tables/maintenance-others-table.vue';

@Component({
    name: 'maintenance',
    components: {
        MaterialIcon,
        CardContainer,
        MaintenancePartsTable,
        MaintenanceLaborTable,
        MaintenanceOthersTable,
    },
})
export default class MaintenanceInformation extends VehicleMixin {
    /**
     * The vehicle being displayed
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The maintenance record being viewed.
     */
    protected maintenance: Nullable<Maintenance> = null;

    public async created() {
        const maintenanceId: number = Number.parseInt(this.$route.params.maintenanceId, 10);
        EventBus.emit('loading');
        this.maintenance = await this.$maintenanceStore.getMaintenanceForVehicleById(this.vehicle, maintenanceId);
        EventBus.emit('loaded');
    }
}
</script>