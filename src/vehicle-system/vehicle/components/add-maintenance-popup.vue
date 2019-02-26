<template>
    <popup-container
        id="addMaintenance"
        ref="popup"
        title="Add Maintenance"
        size="lg"
        @ok="onCreate"
    >
        <!-- Progress Tracker to keep the user updated on where their at. -->
        <progress-tracker :current="activePage" :max="4" class="pb-4"/>

        <!-- Step 1: Who -->
        <add-maintenance-mechanic-page
            ref="mechanicPage"
            v-model="mechanic"
            v-if="activePage == 1"
        />

        <!-- Step 2: When -->
        <add-maintenance-when-page ref="whenPage" v-model="whenInfo" v-if="activePage == 2"/>

        <!-- Step 3: What -->
        <add-maintenance-services-page
            ref="servicesPage"
            v-model="services"
            v-if="activePage == 3"
        />

        <!-- Step 4: Cost -->
        <add-maintenance-cost-page ref="costPage" v-model="cost" v-if="activePage == 4"/>

        <previous-next
            class="pt-5"
            @previous="onPrevious"
            @next="onNext"
            :disable-previous="activePage == 1"
            :disable-next="activePage == 4"
        />

        <div slot="footer">
            <b-btn variant="primary" @click="onCreate" :disabled="activePage != 4">
                <material-icon class="align-middle" icon="create"/>
                <span class="align-bottom">Create</span>
            </b-btn>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MechanicMixin } from '@/vehicle-system/mechanic/mechanic-mixin';
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
        PreviousNext,
        AddMaintenanceMechanicPage,
        AddMaintenanceWhenPage,
        AddMaintenanceServicesPage,
        AddMaintenanceCostPage,
    },
})
export default class AddMaintenancePopup extends VehicleMixin implements Popup {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        popup: PopupContainer;
        mechanicPage: AddMaintenanceMechanicPage;
        whenPage: AddMaintenanceWhenPage;
        servicesPage: AddMaintenanceServicesPage;
        costPage: AddMaintenanceCostPage;
    };

    /**
     * The vehicle being worked on.
     */
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The mechanic selected
     */
    public mechanic!: Nullable<Mechanic>;

    /**
     * The date and mileage it occured at.
     */
    public whenInfo!: { mileage: Nullable<number>; date: Nullable<Date> };

    /**
     * The services performed.
     */
    public services!: string[];

    /**
     * The total cost of it.
     */
    public cost!: Nullable<number>;

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
        this.cost = null;
        this.whenInfo = { mileage: null, date: null };
        this.services = [];
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

    public async onCreate(): Promise<void> {
        if (!(await this.$refs.costPage.validate())) {
            return;
        }

        if (this.activePage === 4) {
            if (typeof this.whenInfo.mileage === 'string') {
                this.whenInfo.mileage = parseFloat(this.whenInfo.mileage);
            }

            const event: MaintenanceEvent = new MaintenanceEvent(
                this.whenInfo!.mileage!,
                this.whenInfo.date!,
                this.mechanic!,
                this.services!.map((s) => new MaintenanceService(s))
            );
            event.totalCost = this.cost || 0;

            await this.$vehicleStore.addMaintenanceEvent(this.vehicle, event);
        }
    }

    /**
     * Show the popup on screen.
     */
    public show() {
        this.$refs.popup.show();
        this.activePage = 1;
        this.mechanic = null;
        this.whenInfo = { mileage: null, date: null };
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
                return this.$refs.servicesPage.validate();

            case 4:
                return this.$refs.costPage.validate();

            default:
                return false;
        }
    }
}
</script>