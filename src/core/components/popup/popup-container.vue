<template>
    <div>
        <b-modal
            :id="id"
            :title="title"
            ref="modal"
            @show="onShow"
            @shown="onShown"
            @hide="onHide"
            @hidden="onHidden"
            header-bg-variant="primary"
            header-text-variant="white"
        >
            <slot></slot>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Modal } from 'bootstrap-vue';

/**
 * Container for building a popup that appears on top of the screen.
 */
@Component({
    name: 'popup-container',
})
export default class PopupContainer extends Vue {
    /**
     * References to the children components.
     */
    public $refs!: {
        modal: Modal;
    };

    /**
     * The unique ID of the popup.
     */
    @Prop()
    public id!: string;

    /**
     * The title in the top of the header
     */
    @Prop()
    public title!: string;

    /**
     * Show the popup on screen.
     */
    public show(): void {
        this.$refs.modal.show();
    }

    /**
     * Hide the popup from the screen.
     */
    public hide(): void {
        this.$refs.modal.hide();
    }

    /**
     * Event handler for when the popup has been set to show, but is
     * not yet visible.
     */
    public async onShow(): Promise<void> {
        this.$emit('show');
    }

    /**
     * Event handler for when the popup is visible on screen.
     */
    public async onShown(): Promise<void> {
        this.$emit('shown');
    }

    /**
     * Event handler for when the popup has been set to close, but
     * is still visible.
     */
    public async onHide(): Promise<void> {
        this.$emit('hide');
    }

    /**
     * Event handler for when the popup has been hidden.
     */
    public async onHidden(): Promise<void> {
        this.$emit('hidden');
    }
}
</script>