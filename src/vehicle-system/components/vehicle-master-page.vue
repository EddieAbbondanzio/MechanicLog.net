<style lang="scss" scoped>
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.vehicle-detail-edit {
    &:hover {
        background-color: $gray-200 !important;
    }
    &:active {
        background-color: $gray-300 !important;
    }
}

.vehicle-information-tab {
    color: $secondary;
}

.vehicle-information-tab-active {
    color: $dark;
    position: relative;

    &:after {
        content: '';
        display: inline-block;
        left: 10px;
        right: 10px;
        bottom: 0px;
        position: absolute;
        margin-top: 4px;
        height: 4px;
        background-color: $primary;
    }
}

.vehicle-information-tab,
.vehicle-information-tab-active {
    text-align: center;
    display: inline-block;
    width: 148px;
    font-size: 1.25em;
    cursor: pointer;

    &:hover {
        background-color: $gray-200 !important;
    }

    &:active {
        background-color: $gray-300 !important;
    }
}
</style>

<template>
    <page-content v-if="vehicle != null">
        <error-popup ref="errorPopup"/>

        <div
            slot="tool-bar"
            class="d-flex flex-row align-items-center justify-content-between w-100"
        >
            <div>
                <router-link :to="{ name: 'vehicles' }">Vehicles</router-link>
                <span class="text-muted px-2">/</span>
                <span class="text-muted">{{ vehicle.name }}</span>
            </div>
        </div>

        <div class="container-fluid p-0 m-0 d-flex h-100 flex-column">
            <div class="row pb-3">
                <div class="col-12 d-flex flex-row align-items-center">
                    <!-- Car Picture -->
                    <div class="d-inline-block pr-4">
                        <vehicle-picture :profilePicture="vehicleProfilePicture"/>
                    </div>
                    <div>
                        <h1 class="pb-0 mb-0">{{ vehicle.name }}</h1>
                        <h3
                            class="text-muted"
                        >{{ vehicle.year }} {{ vehicle.make.name }} {{ vehicle.model.name }}</h3>
                    </div>
                </div>
            </div>

            <div class="row d-flex h-100">
                <div class="col-12 h-100">
                    <div>
                        <router-link
                            :to="{ name: 'vehicle-information'}"
                            :class="{ 'vehicle-information-tab': activeTab != 1, 'vehicle-information-tab-active': activeTab == 1, 'p-2': true, 'mx-1': true, 'rounded': true  }"
                        >Information</router-link>
                        <router-link
                            :to="{ name: 'vehicle-maintenance'}"
                            :class="{ 'vehicle-information-tab': activeTab != 2, 'vehicle-information-tab-active': activeTab == 2, 'p-2': true, 'mx-1': true, 'rounded': true  }"
                        >Maintenance</router-link>
                        <router-link
                            :to="{ name: 'vehicle-fuel'}"
                            :class="{ 'vehicle-information-tab': activeTab != 3, 'vehicle-information-tab-active': activeTab == 3, 'p-2': true, 'mx-1': true, 'rounded': true  }"
                        >Fuel Economy</router-link>
                        <router-link
                            :to="{ name: 'vehicle-settings'}"
                            :class="{ 'vehicle-information-tab': activeTab != 4, 'vehicle-information-tab-active': activeTab == 4, 'p-2': true, 'mx-1': true, 'rounded': true  }"
                        >Settings</router-link>
                    </div>

                    <router-view :vehicle="vehicle" class="py-4"></router-view>
                </div>
            </div>
        </div>
    </page-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VehicleMixin } from '@/vehicle-system/mixins/vehicle-mixin';
import { Vehicle } from '@/vehicle-system/entities/vehicle/vehicle';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Maybe } from '@/core/common/monads/maybe';
import { Nullable } from '@/core/common/monads/nullable';
import CardContainer from '@/core/components/cards/card-container.vue';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import PageContent from '@/core/components/layout/page-content.vue';
import { VehiclePurchaseInfo } from '@/vehicle-system/entities/vehicle/vehicle-purchase-info';
import LoadingBar from '@/core/components/ux/loading-bar.vue';
import { EventBus } from '@/core/event/event-bus';
import { VehicleProfilePicture } from '../entities/vehicle/vehicle-profile-picture';
import VehiclePicture from '@/vehicle-system/components/vehicle-picture.vue';

/**
 * Maintenance history page.
 */
@Component({
    name: 'vehicle-master-page',
    components: {
        MaterialIcon,
        CardContainer,
        ErrorPopup,
        PageContent,
        LoadingBar,
        VehiclePicture,
    },
})
export default class VehicleMasterPage extends VehicleMixin {
    /**
     * Component references
     */
    public $refs!: {
        errorPopup: ErrorPopup;
    };

    /**
     * The vehicle being displayed
     */
    public vehicle: Vehicle = null!;

    public activeTab: number = 1;

    /**
     * The profile picture of the vehicle.
     */
    public vehicleProfilePicture: Nullable<VehicleProfilePicture> = null;

    /**
     * On page load, pull in the vehicle.
     */
    public async created(): Promise<void> {
        EventBus.emit('loading');
        const vehicleId: number = Number.parseInt(this.$route.params.vehicleId, 10);
        this.vehicle = (await this.$vehicleStore.getVehicle(vehicleId)) as Vehicle;

        // Hack for now.
        switch (this.$route.name) {
            case 'vehicle-information':
                this.activeTab = 1;
                break;
            case 'vehicle-maintenance':
                this.activeTab = 2;
                break;
            case 'vehicle-fuel':
                this.activeTab = 3;
                break;
            case 'vehicle-settings':
                this.activeTab = 4;
                break;
        }

        this.vehicleProfilePicture = await this.$vehicleProfilePictureStore.getVehicleProfilePicture(this.vehicle);

        EventBus.emit('loaded');
        this.$forceUpdate();

        this.$watch('$route', this.onPageChange);

        // When the profile picure is deleted, update it.
        EventBus.on('vehicleProfilePictureDeleted', async (vehicle: Vehicle) => {
            if (this.vehicle.id === vehicle.id) {
                this.vehicleProfilePicture = null;
            }
        });

        // When a profile picture is uploaded, show it.
        EventBus.on('vehicleProfilePictureUploaded', async (vehicle: Vehicle) => {
            if (this.vehicle.id === vehicle.id) {
                this.vehicleProfilePicture = await this.$vehicleProfilePictureStore.getVehicleProfilePicture(this.vehicle);
            }
        });
    }

    public async onPageChange(index: number) {
        // Hack for now.
        switch (this.$route.name) {
            case 'vehicle-information':
                this.activeTab = 1;
                break;
            case 'vehicle-maintenance':
                this.activeTab = 2;
                break;
            case 'vehicle-fuel':
                this.activeTab = 3;
                break;
            case 'vehicle-settings':
                this.activeTab = 4;
                break;
        }
    }
}
</script>