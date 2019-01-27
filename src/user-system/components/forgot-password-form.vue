<template>
  <form-container
    title="Password Recovery"
    description="Please enter the email address associated with your account, and we'll send you a password reset code."
  >
    <div class="form-group">
      <label class="required" for="email-textbox">Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="email-textbox"
        placeholder="Email@domain.com"
        name="email"
        v-validate="'required|email'"
        data-vv-validate-on="blur"
      >
    </div>

    <form-error-list :form="this"/>

    <div class="form-group mt-5">
      <button
        type="button"
        class="btn btn-primary d-inline-block"
        id="email-button"
        @click="onSendEmailButtonClick"
      >Send Email</button>
    </div>
  </form-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormContainer from '@/core/components/form/form-container.vue';
import FormErrorList from '@/core/components/form/form-error-list.vue';

/**
 * Password recovery form that will have a reset code emailed
 * to the user so they can recover their account.
 */
@Component({
  name: 'forgot-password-form',
  components: {
    FormContainer,
    FormErrorList,
  },
})
export default class ForgotPasswordForm extends Vue {
  /**
   * The email address of the user.
   */
  public email!: string;

  /**
   * Initialize the component.
   */
  public created(): void {
    this.email = '';
  }

  /**
   * Handler to send off an email to the user.
   */
  public async onSendEmailButtonClick(): Promise<void> {
    // If things aren't valid, stop.
    if (!(await this.$validator.validate())) {
      return;
    }

    // Notify the parent page
    this.$emit('submit', this.email);
  }
}
</script>