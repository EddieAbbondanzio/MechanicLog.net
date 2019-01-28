<template>
  <form-container
    title="Password Reset"
    description="Please check you email for a reset code. The email may take a few moments to arrive."
  >
    <!-- Email -->
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

    <!-- Reset Code -->
    <div class="form-group">
      <label class="required" for="password-textbox">Reset Code</label>
      <input
        v-model="resetCode"
        type="text"
        class="form-control mb-1"
        id="reset-code-textbox"
        placeholder="ABC123"
        name="reset code"
        v-validate="'required|min:8'"
        data-vv-validate-on="blur"
      >
    </div>

    <!-- New Password -->
    <div class="form-group">
      <label class="required" for="password-textbox">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control mb-1"
        id="password-textbox"
        placeholder="********"
        name="password"
        v-validate="'required|min:8'"
        data-vv-validate-on="blur"
      >
      <small class="form-text text-muted">Passwords must be at least 8 characters long.</small>
    </div>

    <!-- Confirm Password -->
    <div class="form-group">
      <label class="required" for="password-confirm-textbox">Confirm Password</label>
      <input
        v-model="confirmPassword"
        type="password"
        class="form-control mb-1"
        id="password-confirm-textbox"
        placeholder="********"
        name="confirmPassword"
        v-validate="'required|confirmed:password'"
        data-vv-validate-on="blur"
      >
    </div>

    <form-error-list :form="this"/>
    <alert-message :type="message.type" v-if="message.text.length > 0">{{ message.text }}</alert-message>

    <div class="form-group mt-5">
      <button
        type="button"
        class="btn btn-primary d-inline-block"
        id="reset-password-button"
        @click="onResetPasswordButtonClick"
      >Reset Password</button>
    </div>
  </form-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormContainer from '@/core/components/form/form-container.vue';
import AlertMessage, { AlertType } from '@/core/components/alert-message.vue';
import FormErrorList from '@/core/components/form/form-error-list.vue';


/**
 * Form to reset a user's password using the password reset
 * code they were emailed.
 */
@Component({
  name: 'reset-password-form',
  components: {
    FormContainer,
    FormErrorList,
    AlertMessage,
  },
})
export default class ResetPasswordForm extends Vue {
  /**
   * The user's email
   */
  public email!: string;

  public resetCode!: string;

  public password!: string;

  public confirmPassword!: string;

  /**
   * The message being displayed to the user.
   */
  public message!: {
    text: string,
    type: AlertType,
  };

  public created(): void {
    this.email = '';
    this.resetCode = '';
    this.password = '';
    this.confirmPassword = '';

    this.message = {
      text: '',
      type: 'Danger',
    };
  }

  public async onResetPasswordButtonClick(): Promise<void> {

  }
}
</script>