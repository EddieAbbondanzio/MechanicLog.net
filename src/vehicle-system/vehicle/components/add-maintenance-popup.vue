<template>
    <popup-container id="addMaintenance" ref="popup" title="Add Maintenance" size="lg">
        <form>
            <b-card no-body border-variant="white">
                <b-tabs v-model="activeStep">
                    <!-- Model Information -->
                    <b-tab title="Mechanic" class="py-4" @click="onTabClick"></b-tab>

                    <!-- Registration -->
                    <b-tab title="Date" class="py-4" @click="onTabClick"></b-tab>

                    <!-- Details -->
                    <b-tab title="Services" class="py-4" @click="onTabClick"></b-tab>
                    <!-- Details -->
                    <b-tab title="Cost" class="py-4" @click="onTabClick"></b-tab>
                </b-tabs>
            </b-card>
        </form>

        <hr>

        <progress-tracker :current="activeStep + 1" :max="4"/>

        <!-- Previous Button -->
        <div slot="footer">
            <b-button
                variant="success"
                class="float-left"
                v-if="activeStep > 0"
            >Previous</b-button>

            <!-- Next Button -->
            <b-button
                variant="success"
                class="float-right"
                @click="onNextClick"
                v-if="activeStep < 3"
            >Next</b-button>

            <!-- Create Button -->
            <b-button
                variant="primary"
                class="float-right"
                v-else
            >Create</b-button>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { MechanicMixin } from '@/vehicle-system/mechanic/mechanic-mixin';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import { Popup } from '@/core/components/interfaces/popup';
import ProgressTracker from '@/core/components/ux/progress-tracker.vue';
import { Nullable } from '@/core/common/monads/nullable';
import { MaintenanceEvent } from '@/vehicle-system/vehicle/entities/maintenance-event';
import { MaintenanceService } from '@/vehicle-system/vehicle/entities/maintenance-service';
import { VehicleMixin } from '@/vehicle-system/vehicle/vehicle-mixin';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';

/**
 * Popup form to add a new maintenance even.
 */
@Component({
    name: 'add-maintenance-popup',
    components: {
        MaterialIcon,
        PopupContainer,
        ProgressTracker,
    },
})
export default class AddMaintenancePopup extends VehicleMixin implements Popup {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        popup: PopupContainer;
    };

    /**
     * The vehicle being worked on.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The active step the user is on.
     */
    public activeStep: number = 0;

    /**
     * Cache of the last step we were on.
     */
    public lastStep: number = 0;

    public async onTabClick(): Promise<void> {
        this.lastStep = this.activeStep;
        this.$forceUpdate();
        console.log('clicked', this.activeStep);
    }

    @Watch('activeStep')
    public fuck(value: any): void {
        console.log('fuck');
    }

    /**
     * Event handler for when the user wants to go back a page.
     */
    public async onPrevious(): Promise<void> {
        if (this.activeStep > 1) {
            this.activeStep = this.activeStep;
            this.$forceUpdate();
        }
    }

    /**
     * Event handler for when the user wants to go forward a page.
     */
    public async onNextClick(): Promise<void> {
        if (this.activeStep < 4) {
            this.activeStep += 1;
            // this.activeStep++;
        }

        console.log('on next click: ', this.activeStep);
    }

    public async onCreate(): Promise<void> {}

    /**
     * Show the popup on screen.
     */
    public show() {
        this.$refs.popup.show();
        this.activeStep = 0;
        this.$forceUpdate();
    }

    /**
     * Hide the popup on screen.
     */
    public hide() {
        this.$refs.popup.hide();
        this.$forceUpdate();
    }
}
</script>
