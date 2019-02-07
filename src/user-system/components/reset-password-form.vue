<template>
  <form-container
    title="Password Reset"
    description="Please check your email inbox for a reset code. The email may take a few moments to arrive. If it's still not coming in please be sure to check your spam folder."
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
        v-model="newPassword"
        type="text"
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
        type="text"
        class="form-control mb-1"
        id="password-confirm-textbox"
        placeholder="********"
        name="confirmPassword"
        v-validate="'required|confirmed:password'"
        data-vv-validate-on="blur"
      >
    </div>

    <form-error-list :form="this"/>
    <alert-message :color="message.color" v-if="message.text.length > 0">{{ message.text }}</alert-message>

    <div class="form-group mt-5">
      <form-submit-button text="Reset Password" @click="onResetPasswordButtonClick"/>
    </div>
  </form-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormContainer from '@/core/components/shared/form/form-container.vue';
import { ThemeColor } from '@/core/components/shared/theme-color';
import AlertMessage from '@/core/components/shared/alert-message.vue';
import FormErrorList from '@/core/components/shared/form/form-error-list.vue';
import { UserPasswordReset } from '@/user-system/services/auth/user-password-reset';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import FormSubmitButton from '@/core/components/shared/form/form-submit-button.vue';

/**
 * Form to reset a user's password using the password reset
 * code they were emailed.
 */
@Component({
  name: 'reset-password-form',
  components: {
    FormContainer,
    FormErrorList,
    FormSubmitButton,
    AlertMessage,
  },
})
export default class ResetPasswordForm extends UserMixin {
  /**
   * The user's email
   */
  public email!: string;

  public resetCode!: string;

  public newPassword!: string;

  public confirmPassword!: string;

  /**
   * The message being displayed to the user.
   */
  public message!: {
    text: string,
    color: ThemeColor,
  };

  public created(): void {
    this.email = '';
    this.resetCode = '';
    this.newPassword = '';
    this.confirmPassword = '';

    this.message = {
      text: '',
      color: 'danger',
    };
  }

  public async onResetPasswordButtonClick(): Promise<void> {
    // If things aren't valid, stop.
    if (!(await this.$validator.validate())) {
      return;
    }

    try {
      await this.$resetPassword({
        email: this.email,
        resetToken: this.resetCode,
        newPassword: this.newPassword,
      } as UserPasswordReset);

      // Propogate the event up
      this.$emit('submit');
    } catch (error) {
      this.message.color = 'danger';
      this.message = error.message;
    }
  }
}
</script>