<template>
  <div :class="getCssClass()">
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ThemeColor } from './theme-color';
import { Prop } from 'vue-property-decorator';

/**
 * Component for displaying a text message to the screen in a colorful
 * box that grabs the user's attention.
 */
@Component({
  name: 'alert-message',
})
export default class AlertMessage extends Vue {
  /**
   * Color scheme of the alert message.
   */
  @Prop({ default: 'Primary' })
  public color!: ThemeColor;

  /**
   * Get the Bootstrap CSS class to apply for it's special coloring.
   */
  public getCssClass(): {} {
    return {
      'alert': true,
      'alert-primary': this.color === 'primary',
      'alert-secondary': this.color === 'secondary',
      'alert-success': this.color === 'success',
      'alert-danger': this.color === 'danger',
      'alert-warning': this.color === 'warning',
      'alert-info': this.color === 'info',
      'alert-light': this.color === 'light',
      'alert-dark': this.color === 'dark',
    };
  }
}

</script>
