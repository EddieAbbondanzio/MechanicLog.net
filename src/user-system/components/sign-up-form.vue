<template>
  <div class="row my-5">
    <div class="col-md-8 offset-md-2 col-lg-4 offset-lg-4">
      <form class="px-3">
        <form-header title="Sign Up"/>

        <alert-message type="Success" v-if="successMessage.length > 0">{{ successMessage }}</alert-message>
        <alert-message type="Danger" v-if="errorMessage.length > 0">{{ errorMessage }}</alert-message>

        <!-- Real Name -->
        <div class="form-group">
          <input
            v-model="name"
            type="email"
            class="form-control"
            id="email-textbox"
            placeholder="John Smith"
            name="email"
            v-validate="'required'"
          >
          <div class="invalid-feedback">{{ errors.first('name')}}</div>
        </div>

        <!-- Email Address -->
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email-textbox"
            placeholder="Email@domain.com"
            name="email"
            v-validate="'required|email'"
          >
          <div class="invalid-feedback">{{ errors.first('email')}}</div>
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            class="form-control mb-1"
            id="password-textbox"
            placeholder="Password"
            name="password"
            v-validate="'required'"
          >
          <div class="invalid-feedback">{{ errors.first('password')}}</div>
        </div>

        <div class="form-group mb-">
          <input
            v-model="confirmPassword"
            type="password"
            class="form-control mb-1"
            id="password-textbox"
            placeholder="Confirm Password"
            name="password"
            v-validate="'required'"
          >
          <div class="invalid-feedback">{{ errors.first('confirmPassword')}}</div>
        </div>

        <button
          type="button"
          class="btn btn-primary d-inline-block"
          id="login-button"
          @click="onSignUpButtonClicked"
        >Sign Up</button>
        <div class="form-group form-check d-inline-block ml-3">
          <input v-model="iAgree" type="checkbox" class="form-check-input" id="i-agree-checkbox">
          <label class="form-check-label" for="i-agree-checkbox">I agree to the Terms of Use</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import { User } from '@/user-system/entities/user';
import FormHeader from '@/core/components/form/form-header.vue';
import AlertMessage from '@/core/components/alert-message.vue';

/**
 * Sign up form to allow new users to register.
 */
@Component({
  name: 'sign-up-form',
  components: {
    FormHeader,
    AlertMessage,
  },
})
export default class SignUpForm extends UserMixin {
  /**
   * Error from the server on a failed login.
   */
  public errorMessage!: string;

  /**
   * Success message for when a login succeeds.
   */
  public successMessage!: string;

  public name!: string;

  public email!: string;

  public password!: string;

  public confirmPassword!: string;

  public iAgree!: boolean;

  /**
   * Properties are assigned in created to prevent weird undefined errors.
   */
  public created(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  /**
   * User wants to log in. Validate the email, and password
   * inputs first, then send off a request to the back end.
   */
  public async onSignUpButtonClicked(event: any): Promise<void> {
    // Validate first.
    if (!(await this.$validator.validate())) {
      return;
    }
    try {

    } catch (error) {
      // Alert the user of what went wrong
      this.errorMessage = error.message;
      this.successMessage = '';
    }
  }
}
</script>
