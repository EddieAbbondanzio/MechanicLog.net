<template>
  <button
    class="btn btn-primary d-inline-block"
    type="button"
    @click="onClick"
    :disabled="isLoading"
  >
    <span
      class="spinner-border spinner-border-sm mr-2"
      role="status"
      aria-hidden="true"
      v-if="isLoading"
    ></span>
    <span v-if="isLoading">Loading...</span>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * Form submission button that disables itself, and shows a loading spinner
 * in it to signify that the site is awaiting a response from the backend.
 */
@Component({
  name: 'form-submit-button',
})
export default class FormSubmitButton extends Vue {
  /**
   * The text on the button when it's in normal state.
   */
  @Prop()
  public text!: string;

  /**
   * If the form has been submitted, and a loading icon needs to be shown.
   */
  public isLoading!: boolean;

  /**
   * Initialize the component.
   */
  public created(): void {
    this.isLoading = false;
  }

  /**
   * Event handler that fires when the button is clicked.
   */
  public onClick(): void {
    this.isLoading = true;
    this.$forceUpdate();

    // Propogate the event up.
    this.$emit('click');
  }

  /**
   * Reset the button back to it's default state.
   */
  public reset(): void {
    this.isLoading = false;
    this.$forceUpdate();
  }
}
</script>