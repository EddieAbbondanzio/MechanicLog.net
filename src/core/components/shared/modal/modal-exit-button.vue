<template>
    <button
        type="button"
        :class="'btn btn-' + color"
        data-dismiss="modal"
    ><slot></slot></button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ThemeColor } from '@/core/components/shared/theme-color';
import { Themeable } from '@/core/components/shared/themeable';

/**
 * Button to make a modal hidden again.
 */
@Component({
    name: 'modal-trigger-button',
})
export default class ModalExitButton extends Vue implements Themeable {
    /**
     * The theme color of the component.
     */
    @Prop({ default: 'Primary' })
    public color!: ThemeColor;
}
</script>