<template>
    <popup-container id="addMaintenance" ref="popup" title="Add Maintenance" size="lg">
        <!-- Progress Tracker to keep the user updated on where their at. -->
        <progress-tracker :current="activePage" :max="4" class="pb-4"/>

        <!-- Step 1: Who -->
        <add-maintenance-mechanic-page
            ref="mechanicPage"
            v-model="mechanic"
            v-if="activePage == 1"
        />

        <!-- Step 2: When -->
        <add-maintenance-when-page 
        ref="whenPage" 
        v-model="whenInfo" 
        v-if="activePage == 2"/>

        <!-- Step 3: What -->
        <add-maintenance-services-page ref="servicesPage" v-if="activePage == 3"/>

        <!-- Step 4: Cost -->
        <add-maintenance-cost-page ref="costPage" v-if="activePage == 4"/>

        <previous-next
            class="pt-5"
            @previous="onPrevious"
            @next="onNext"
            :disable-previous="activePage == 1"
            :disable-next="activePage == 4"
        />
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MechanicMixin } from '@/vehicle-system/mechanic/mixins/mechanic-mixin';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import { Popup } from '@/core/components/interfaces/popup';
import ProgressTracker from '@/core/components/multi-step/progress-tracker.vue';
import PreviousNext from '@/core/components/multi-step/previous-next.vue';
import AddMaintenanceMechanicPage from './add-maintenance-mechanic-page.vue';
import AddMaintenanceWhenPage from './add-maintenance-when-page.vue';
import AddMaintenanceServicesPage from './add-maintenance-services-page.vue';
import AddMaintenanceCostPage from './add-maintenance-cost-page.vue';
import { Nullable } from '@/core/common/monads/nullable';

/**
 * Popup form to add a new maintenance even.
 */
@Component({
    name: 'add-maintenance-popup',
    components: {
        MaterialIcon,
        PopupContainer,
        ProgressTracker,
        PreviousNext,
        AddMaintenanceMechanicPage,
        AddMaintenanceWhenPage,
        AddMaintenanceServicesPage,
        AddMaintenanceCostPage,
    },
})
export default class AddMaintenancePopup extends MechanicMixin implements Popup {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        popup: PopupContainer;
        mechanicPage: AddMaintenanceMechanicPage;
        whenPage: AddMaintenanceWhenPage;
    };

    /**
     * The mechanic selected
     */
    public mechanic!: Nullable<Mechanic>;

    /**
     * The date and mileage it occured at.
     */
    public whenInfo!: { mileage: Nullable<number>; date: Nullable<Date> };

    /**
     * The active step the user is on.
     */
    public activePage!: number;

    /**
     * The mechanics of the user.
     */
    public mechanics: Mechanic[] = [];

    public async created(): Promise<void> {
        this.activePage = 1;
        this.mechanic = null;
        this.whenInfo = {mileage: null, date: null };
    }

    /**
     * Event handler for when the user wants to go back a page.
     */
    public async onPrevious(): Promise<void> {
        if (this.activePage > 1) {
            this.activePage--;
            this.$forceUpdate();
        }
    }

    /**
     * Event handler for when the user wants to go forward a page.
     */
    public async onNext(): Promise<void> {
        if (this.activePage < 4) {
            if (!(await this.validate())) {
                return;
            }

            this.activePage++;
            this.$forceUpdate();
        }
    }

    /**
     * Show the popup on screen.
     */
    public show() {
        this.$refs.popup.show();
        this.activePage = 1;
        this.mechanic = null;
        this.whenInfo = {mileage: null, date: null };
        this.$forceUpdate();
    }

    /**
     * Hide the popup on screen.
     */
    public hide() {
        this.$refs.popup.hide();
        this.activePage = 1;
        this.$forceUpdate();
    }

    protected async validate(): Promise<boolean> {
        switch (this.activePage) {
            case 1:
                return this.$refs.mechanicPage.validate();

            case 2:
                return this.$refs.whenPage.validate();

            case 3:
                return false;

            case 4:
                return false;

            default:
                return false;
        }
    }
}
</script>