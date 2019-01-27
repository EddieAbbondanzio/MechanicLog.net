<template>
  <form-container title="Login">
    <alert-message type="Success" v-if="successMessage.length > 0">{{ successMessage }}</alert-message>
    <alert-message type="Danger" v-if="errorMessage.length > 0">{{ errorMessage }}</alert-message>

    <div class="form-group">
      <label for="email-textbox">Email</label>
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
    <div class="form-group">
      <label for="email-textbox">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control mb-1"
        id="password-textbox"
        placeholder="********"
        name="password"
        v-validate="'required'"
        data-vv-validate-on="blur"
      >
      <router-link class="info-link" to="/forgot">I forgot my password</router-link>
    </div>

    <form-error-list :form="this"/>

    <div class="form-group mt-5">
      <button
        type="button"
        class="btn btn-primary d-inline-block"
        id="login-button"
        @click="onLoginButtonClicked"
      >Login</button>
      <div class="form-check d-inline-block ml-3">
        <input
          v-model="rememberMe"
          type="checkbox"
          class="form-check-input"
          id="remember-me-check-box"
        >
        <label class="form-check-label" for="remember-me-check-box">Remember Me</label>
      </div>
    </div>
  </form-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import { User } from '@/user-system/entities/user';
import AlertMessage from '@/core/components/alert-message.vue';
import FormContainer from '@/core/components/form/form-container.vue';
import FormErrorList from '@/core/components/form/form-error-list.vue';

/**
 * Login form to allow a user to sign in.
 */
@Component({
  name: 'login-form',
  components: {
    FormContainer,
    FormErrorList,
    AlertMessage,
  },
})
export default class LoginForm extends UserMixin {
  /**
   * The email of the user.
   */
  public email!: string;

  /**
   * The password of the user.
   */
  public password!: string;

  /**
   * If the user wants to save their login for re-use
   * next time they visit the site.
   */
  public rememberMe!: boolean;

  /**
   * Error from the server on a failed login.
   */
  public errorMessage!: string;

  /**
   * Success message for when a login succeeds.
   */
  public successMessage!: string;

  /**
   * Properties are assigned in created to prevent weird undefined errors.
   */
  public created(): void {
    this.email = '';
    this.password = '';
    this.rememberMe = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  /**
   * User wants to log in. Validate the email, and password
   * inputs first, then send off a request to the back end.
   */
  public async onLoginButtonClicked(event: any): Promise<void> {
    // Validate first.
    if (!(await this.$validator.validate())) {
      return;
    }

    try {
      const u: User | null = await this.$login(this.email, this.password, this.rememberMe);

      // If the login was successful, fire off the event.
      if (u != null) {
        this.errorMessage = '';
        this.successMessage = 'Success. Redirecting...';

        // Propogate the event to the parent (page)
        this.$emit('login', u);
      } else {
        this.errorMessage = 'Invalid email and/or password';
      }
    } catch (error) {
      // Alert the user of what went wrong
      this.errorMessage = error.message;
      this.successMessage = '';
    }
  }
}
</script>
