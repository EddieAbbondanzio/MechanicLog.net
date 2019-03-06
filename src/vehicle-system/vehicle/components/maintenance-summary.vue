<style lang="scss">
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.maintenance-summary {
}

.maintenance-options-button {
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
                <div class="col-10 col-lg-11 .maintenance-summary text-muted">
                    <div class="row">
                        <div class="col-2 py-2">
                            <span style="line-height: 39px;">{{ maintenanceEvent.mileage.toLocaleString() }}</span>
                        </div>
                        <div class="col-1 py-2">
                            <span
                                style="line-height: 39px;"
                            >{{ toFormattedString(maintenanceEvent.date) }}</span>
                        </div>
                        <div class="col-2 py-2">
                            <span style="line-height: 39px;">{{ maintenanceEvent.mechanic.name }}</span>
                        </div>
                        <div class="col-3 py-2" style="overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            <span
                                style="line-height: 39px;"
                                :title="maintenanceEvent.services.map((s) => s.description).join(', ')"
                            >{{ maintenanceEvent.services.map((s) => s.description).join(', ') }}</span>
                        </div>
                        <div class="col-2 py-2">
                            <span style="line-height: 39px;">{{ maintenanceEvent.totalCost }}</span>
                        </div>
                        <div class="col-2 py-2">
                            <span style="line-height: 39px;">{{ maintenanceEvent.label }}</span>
                        </div>
                    </div>
                </div>

                <!-- More Options Button -->
                <div
                    class="col-2 col-lg-1 py-2 maintenance-options-button text-center d-table align-middle text-muted"
                >
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

        <delete-maintenance-confirm-popup ref="deletePopup" @delete="onDelete"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MaintenanceEvent } from '@/vehicle-system/vehicle/entities/maintenance-event';
import MaterialIcon from '@/core/components/material-icon.vue';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import { Nullable } from '@/core/common/monads/nullable';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import deleteMaintenanceConfirmPopup from '@/vehicle-system/vehicle/components/delete-maintenance-confirm-popup.vue';

/**
 * Summary of a maintenance event.
 */
@Component({
    name: 'maintenance-summary',
    components: {
        MaterialIcon,
        deleteMaintenanceConfirmPopup,
    },
})
export default class MaintenanceSummary extends VehicleMixin {
    public $refs!: {
        deletePopup: deleteMaintenanceConfirmPopup;
    };

    /**
     * The event being summarized.
     */
    @Prop()
    public maintenanceEvent!: MaintenanceEvent;

    private async onDeleteClick(): Promise<void> {
        this.$refs.deletePopup.show();
    }

    /**
     * Delete the maintenance event
     */
    private async onDelete(): Promise<void> {
        const vehicles = await this.$vehicleStore.getVehicles();

        if (vehicles.isRight()) {
            return;
        }

        const vehicle: Nullable<Vehicle> = vehicles.getLeft().find((v) => v.id === this.maintenanceEvent.vehicleId) || null;
        await this.$vehicleStore.deleteMaintenanceEvent(vehicle!, this.maintenanceEvent);
    }

    /**
     * Convert the date into a user friendly MM/dd/YYYY strng.
     * @param date The date to convert.
     */
    private toFormattedString(date: Date) {
        const year = date.getFullYear();

        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return month + '/' + day + '/' + year;
    }
}
</script>