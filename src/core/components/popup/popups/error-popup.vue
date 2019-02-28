<template>
    <popup-container id="addMaintenance" ref="popup" title="Error" size="lg" headerColor="danger">
        <div class="py-3">
            <div class="position-relative d-table">
                <material-icon icon="error" size="xl" color="danger" class="pr-2"/>
                <p class="d-table-cell mb-0" style="vertical-align: middle;">{{ message }}</p>
            </div>
        </div>

        <div slot="footer">
            <b-btn variant="primary" @click="hide">
                Ok
            </b-btn>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import MaterialIcon from '@/core/components/material-icon.vue';

/**
 * Popup for when an error occurs
 */
@Component({
    name: 'error-popup',
    components: {
        PopupContainer,
        MaterialIcon,
    },
})
export default class ErrorPopup extends Vue {
    public $refs!: {
        popup: PopupContainer;
    };

    /**
     * The error message to display.
     */
    public message!: string;

    public created() {
        this.message = '';
    }

    /**
     * Show the error to the screen.
     */
    public show(errorMsg: string = 'Something went wrong. Please try again later.'): void {
        this.message = errorMsg;
        this.$refs.popup.show();
    }

    /**
     * Hide the error from the screen.
     */
    public hide(): void {
        this.message = 'Something went wrong. Please try again later.';
        this.$refs.popup.hide();
    }
}
</script>