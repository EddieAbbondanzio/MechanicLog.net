<style>
</style>

<template>
  <div class="row my-5">
    <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
      <form class="px-3" ref="form">
        <form-header title="Login"/>

        <div class="alert-danger mb-2 p-1">
            Unable to log in. Invalid email and/or password
        </div>

        <div class="form-group">
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="emailTB"
            placeholder="Email@domain.com"
            required
          >
          <div
            class="invalid-feedback"
          >{{ email.length == 0 ? 'Email is required' : 'Invalid email'}}</div>
        </div>
        <div class="form-group mb-5">
          <input
            v-model="password"
            type="password"
            class="form-control mb-1"
            id="passwordTB"
            placeholder="Password"
            required
          >
          <div class="invalid-feedback">Password is required</div>
          <router-link class="info-link" to="/forgot">I forgot my password</router-link>
        </div>

        <button
          type="submit"
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
import { IEventDispatcher } from '@/core/events/i-event-dispatcher';
import { User } from '@/user-system/entities/user';
import FormHeader from '@/components/shared/form/form-header.vue';

/**
 * Login form to allow a user to sign in.
 */
@Component({
  name: 'login-form',
  components: {
    FormHeader,
  },
})
export default class LoginForm extends LoginMixin {
  /**
   * The email of the user.
   */
  public email: string = '';

  /**
   * The password of the user.
   */
  public password: string = '';

  /**
   * If the user wants to save their login for re-use
   * next time they visit the site.
   */
  public rememberMe: boolean = false;

  /**
   * On user login event.
   */
  get onLogin(): IEventDispatcher<User> {
    return this._onLoginDispatcher as IEventDispatcher<User>;
  }

  /**
   * Event handler for when the user logs in.
   */
  private readonly _onLoginDispatcher: EventDispatcher<User> = new EventDispatcher<User>();

  /**
   * User wants to log in. Validate the email, and password
   * inputs first, then send off a request to the back end.
   */
  public async onLoginButtonClicked(): Promise<void> {
    // Double check everything's valid first.
    if (this.isEmailValid() && this.isPasswordValid()) {
      try {
        const u: User | null = await this.loginUser(this.email, this.password, this.rememberMe);

        // If the login was successful, fire off the event.
        if (u != null) {
          this._onLoginDispatcher.dispatch(u);
        }
      } catch {
        // Alert the user of the failed login.
      }
    }
  }

  /**
   * Check if the email in the email textbox is valid.
   * @returns True if the email is valid.
   */
  public isEmailValid(): boolean {
    return false;
  }

  /**
   * Checks if the password in the password textbox is
   * valid.
   * @returns True if the email is not empty.
   */
  public isPasswordValid(): boolean {
    return false;
  }
}
</script>
