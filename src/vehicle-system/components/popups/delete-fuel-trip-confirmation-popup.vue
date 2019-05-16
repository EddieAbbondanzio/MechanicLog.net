<template>
    <b-modal title="Delete Fuel Trip Confirmation" ref="popup">
        <div class="text-center">
            <h3>Are you sure?</h3>

            <p
                class="text-muted"
            >This action cannot be undone, and the vehicle fuel trip will be permanently deleted.</p>
        </div>

        <div slot="modal-footer">
            <b-btn variant="muted" class="mr-1" @click="onCancelButton">Cancel</b-btn>
            <b-btn variant="danger" class="ml-1" @click="onDeleteButton">Delete</b-btn>
        </div>
    </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Modal } from 'bootstrap-vue';

/**
 * Confirmation popup to confirm that a user wants to delete a
 * vehicle.
 */
@Component({
    name: 'delete-fuel-trip-confirmation-popup',
})
export default class DeleteFuelTripConfirmationPopup extends Vue {
    /**
     * Show the popup on the screen.
     */
    public show(): void {
        (this.$refs.popup as Modal).show();
    }

    /**
     * Hide the popup from the screen.
     */
    public hide(): void {
        (this.$refs.popup as Modal).hide();
    }

    /**
     * User doesn't want to. Hide the popup.
     */
    protected async onCancelButton(): Promise<void> {
        this.hide();
    }

    /**
     * Propogate the event up, and hide the popup.
     */
    protected async onDeleteButton(): Promise<void> {
        this.$emit('delete');
        this.hide();
    }
}
</script>