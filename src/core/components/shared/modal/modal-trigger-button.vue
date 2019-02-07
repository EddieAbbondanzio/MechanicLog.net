<template>
    <button
        type="button"
        :class="'btn btn-' + color"
        data-toggle="modal"
        :data-target="'#' + target"
    ><slot></slot></button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ThemeColor } from '@/core/components/shared/theme-color';

/**
 * Button to make a modal popup visible.
 */
@Component({
    name: 'modal-trigger-button',
})
export default class ModalTriggerButton extends Vue {
    /**
     * The name of the modal popup it triggers like a SJW.
     */
    @Prop()
    public target!: string;

    /**
     * The theme color of the component.
     */
    @Prop({ default: 'Primary' })
    public color!: ThemeColor;
}
</script>