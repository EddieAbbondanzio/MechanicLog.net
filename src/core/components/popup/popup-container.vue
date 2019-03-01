<template>
    <div>
        <b-modal
            :id="id"
            :title="title"
            :size="size"
            ref="modal"
            @show="onShow"
            @shown="onShown"
            @hide="onHide"
            @hidden="onHidden"
            :header-bg-variant="headerColor"
            header-text-variant="white"
            footer-bg-variant="light"
        >
            <div class="p-4">
                <slot></slot>
            </div>

            <div slot="modal-footer" class="w-100">
                <div class="w-100">
                    <slot name="footer"></slot>
                </div>
            </div>
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
     * The size of the popup.
     */
    @Prop({ default: 'md' })
    public size!: string;

    /**
     * The title in the top of the header
     */
    @Prop()
    public title!: string;

    /**
     * The color of the banner.
     */
    @Prop({ default: 'primary' })
    public headerColor!: string;

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