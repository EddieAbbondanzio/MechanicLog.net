<template>
  <master-page>
    <div class="row my-5">
      <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <!-- Request Reset Code Email -->
        <form class="px-3" ref="emailForm" v-if="activeStep == 1">
          <form-header
            title="Password Reset"
            description="In order to verify your identity, we'll send a verification code to your email.
            You'll this need for step 2."
          />

          <!-- Email Textbox -->
          <div class="form-group">
            <input
              id="emailTB"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Email@domain.com"
              @change="validateEmail"
              required
            >
            <div
              class="invalid-feedback"
            >{{ email.length == 0 ? 'Email is required' : 'Email is invalid' }}</div>
          </div>

          <!-- Email me button -->
          <button type="submit" class="btn btn-primary" @click="emailFormSubmit">Send Reset Code</button>
        </form>

        <!-- Password Reset For -->
        <form ref="resetForm" class="needs-validation" novalidate="true" v-if="activeStep == 2">
          <form-header
            title="Password Reset"
            description="We've sent an email containing a verification code
            to your email. It may take a few moments to arrive. If it's still not showing up please check your spam folder."
          />

          <!-- Reset Code Textbox -->
          <div class="form-group">
            <input
              id="resetCodeTB"
              v-model="resetCode"
              type="text"
              class="form-control"
              placeholder="Reset code from email"
              required
            >
            <div class="invalid-feedback">Reset code is required</div>
          </div>

          <!-- New Password Textbox -->
          <div class="form-group">
            <input
              id="newPasswordTB"
              v-model="newPassword"
              type="password"
              class="form-control"
              placeholder="New password"
              required
            >
            <div class="invalid-feedback">Password is required</div>
          </div>

          <!-- Confirm Password Textbox -->
          <div class="form-group">
            <input
              id="confirmPasswordTB"
              v-model="confirmPassword"
              type="password"
              class="form-control"
              placeholder="Confirm password"
              required
            >
            <div
              class="invalid-feedback"
            >{{ confirmPassword.length == 0 ? 'Confirmation password is required' : 'Confirmation password does not match' }}</div>
          </div>
          <!-- Reset Button -->
          <button type="submit" class="btn btn-primary" @click="resetFormSubmit">Reset Password</button>
        </form>
      </div>
    </div>
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form } from '@/components/shared/form/form';
import MasterPage from '@/components/shared/master-page.vue';
import FormHeader from '@/components/shared/form/form-header.vue';

/**
 * Forgotten password page. Allows user's to reset their password.
 */
@Component({
  components: {
    MasterPage,
    FormHeader,
  },
})
export default class Forgot extends Form {
  /**
   * The current step the user is on.
   */
  public activeStep: number = 1;

  /**
   * The user's email address.
   */
  public email: string = '';

  /**
   * The reset code that the user was emailed.
   */
  public resetCode: string = '';

  /**
   * The user's new password.
   */
  public newPassword: string = '';

  /**
   * Confirmation of the new password.
   */
  public confirmPassword: string = '';

  /**
   * User submitted a email. Fire off the request to the
   * backend, then on a successful attempt move them to step 2!
   */
  public emailFormSubmit(e: any): void {
    const emailForm: HTMLFormElement = this.$refs.emailForm as HTMLFormElement;
    const emailTB: HTMLInputElement = emailForm.querySelector('#emailTB') as HTMLInputElement;

    if (this.validateControl(emailTB)) {
      this.activeStep++;
    }
  }

  /**
   * Validate the input from the email textbox.
   */
  public validateEmail(event: any): boolean {
    return this.validateControl(event.target);
  }

  /**
   * User wants to reset their password. Verify everything
   * looks cherry first.
   */
  public resetFormSubmit(e: any): void {
    const resetForm: HTMLFormElement = this.$refs.resetForm as HTMLFormElement;
    const resetCodeTB: HTMLInputElement = resetForm.querySelector('#resetCodeTB') as HTMLInputElement;
    const nPasswordTB: HTMLInputElement = resetForm.querySelector('#newPasswordTB') as HTMLInputElement;
    const cPasswordTB: HTMLInputElement = resetForm.querySelector('#confirmPasswordTB') as HTMLInputElement;

    // Need to validate a code exists
    // Need to validate a password exists
    // Need to validate a confirm password exists
    // Do passwords match.
  }
}
</script>
