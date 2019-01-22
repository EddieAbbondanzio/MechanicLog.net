<style>
</style>

<template>
  <div class="row my-5">
    <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
      <form class="px-3">
        <form-header title="Login"/>

        <alert-message type="Success">
          Uh oh.
        </alert-message>

        <!-- Errors from the server -->
        <div class="alert-danger mb-2 p-1" v-if="errorMessage.length > 0">{{ errorMessage }}</div>

        <div class="form-group">
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="emailTB"
            placeholder="Email@domain.com"
            name="email"
            v-validate="'required|email'"
          >
          <div class="invalid-feedback">{{ errors.first('email')}}</div>
        </div>
        <div class="form-group mb-5">
          <input
            v-model="password"
            type="password"
            class="form-control mb-1"
            id="passwordTB"
            placeholder="Password"
            name="password"
            v-validate="'required'"
          >
          <div class="invalid-feedback">{{ errors.first('password')}}</div>
          <router-link class="info-link" to="/forgot">I forgot my password</router-link>
        </div>

        <button
          type="button"
          class="btn btn-primary d-inline-block"
          id="login-button"
          @click="onLoginButtonClicked"
        >Login</button>
        <div class="form-group form-check d-inline-block ml-3">
          <input
            v-model="rememberMe"
            type="checkbox"
            class="form-check-input"
            id="remember-me-check-box"
          >
          <label class="form-check-label" for="remember-me-check-box">Remember Me</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { LoginMixin } from '@/user-system/mixins/login-mixin';
import { EventDispatcher } from '@/core/events/event-dispatcher';
import { Event } from '@/core/events/event';
import { User } from '@/user-system/entities/user';
import FormHeader from '@/components/shared/form/form-header.vue';
import AlertMessage from '@/core/components/alert-message.vue';

/**
 * Login form to allow a user to sign in.
 */
@Component({
  name: 'login-form',
  components: {
    FormHeader,
    AlertMessage,
  },
})
export default class LoginForm extends LoginMixin {
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
   * On user login event.
   */
  get onLogin(): Event<User> {
    return this._onLoginDispatcher as Event<User>;
  }

  /**
   * Event handler for when the user logs in.
   */
  private _onLoginDispatcher!: EventDispatcher<User>;

  /**
   * Properties are assigned in created to prevent weird undefined errors.
   */
  public created(): void {
    this.email = '';
    this.password = '';
    this.rememberMe = false;
    this.errorMessage = '';
    this._onLoginDispatcher = new EventDispatcher<User>();
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
      const u: User | null = await this.loginUser(this.email, this.password, this.rememberMe);

      // If the login was successful, fire off the event.
      if (u != null) {
        this.errorMessage = '';
        this._onLoginDispatcher.dispatch(u);
      } else {
        this.errorMessage = 'Invalid email and/or password';
      }
    } catch (error) {
      // Alert the user of what went wrong
      this.errorMessage = error.message;
    }
  }
}
</script>
