<template>
  <div :class="getCssClass()">
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

/**
 * Available color schemes of the alert.
 */
export type AlertType = 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Warning' | 'Info' | 'Light' | 'Dark';

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
  public type!: AlertType;

  /**
   * Get the Bootstrap CSS class to apply for it's special coloring.
   */
  public getCssClass(): {} {
    return {
      'alert': true,
      'alert-primary': this.type === 'Primary',
      'alert-secondary': this.type === 'Secondary',
      'alert-success': this.type === 'Success',
      'alert-danger': this.type === 'Danger',
      'alert-warning': this.type === 'Warning',
      'alert-info': this.type === 'Info',
      'alert-light': this.type === 'Light',
      'alert-dark': this.type === 'Dark',
    };
  }
}

</script>
