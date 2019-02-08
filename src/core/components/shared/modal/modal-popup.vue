<style lang="scss">
 
</style>

<template>
    <div
        class="modal fade"
        :id="id"
        tabindex="-1"
        role="dialog"
        :aria-labelledby="id + '-title'"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content" data-fuck="true">
                <!-- Header Banner -->
                <div :class="'modal-header'">
                    <h5 class="modal-title" :id="id + '-title'">{{ title }}</h5>
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <slot></slot>
                </div>
                <!-- Footer -->
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Themeable } from '@/core/components/shared/themeable';
import { ThemeColor } from '@/core/components/shared/theme-color';

/**
 * Popup window modal that can be used to really attract the user's
 * attention.
 */
@Component({
    name: 'modal-popup',
})
export default class ModalPopup extends Vue implements Themeable {
    /**
     * The unique name of the popup.
     */
    @Prop()
    public id!: string;

    /**
     * The header text of the popup.
     */
    @Prop()
    public title!: string;

    /**
     * The color of the header banner.
     */
    @Prop({ default: 'primary'})
    public color!: ThemeColor;
}
</script>