<template>
    <popup-container id="addMaintenance" ref="popup" title="Add Maintenance">
        <progress-tracker :current="1" :max="4" class="pb-4" />
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MechanicMixin } from '@/vehicle-system/mechanic/mixins/mechanic-mixin';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import { Popup } from '@/core/components/interfaces/popup';
import ProgressTracker from '@/core/components/ux/progress-tracker.vue';

/**
 * Popup form to add a new maintenance even.
 */
@Component({
    name: 'add-maintenance-popup',
    components: {
        MaterialIcon,
        PopupContainer,
        ProgressTracker
    },
})
export default class AddMaintenancePopup extends Vue implements Popup {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        popup: PopupContainer;
    };

    /**
     * Show the popup on screen.
     */
    public show() {
        this.$refs.popup.show();
    }

    /**
     * Hide the popup on screen.
     */
    public hide() {
        this.$refs.popup.hide();
    }
}
</script>