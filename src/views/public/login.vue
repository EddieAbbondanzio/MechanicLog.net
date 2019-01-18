<template>
  <master-page>
    <div class="row my-5">
      <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <form class="px-3" ref="form">
          <form-header title="Login"/>

          <div class="form-group">
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="emailTB"
              placeholder="Email@domain.com"
              @change="validateEmail"
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
              @change="validatePassword"
              required
            >
            <div class="invalid-feedback">Password is required</div>
            <router-link class="info-link" to="/forgot">I forgot my password</router-link>
          </div>

          <button
            type="submit"
            class="btn btn-primary d-inline-block"
            id="login-button"
            @click="login"
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
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form } from '@/components/shared/form/form';
import MasterPage from '@/components/shared/master-page.vue';
import FormHeader from '@/components/shared/form/form-header.vue';
import { mixins } from 'vue-class-component';
import { AuthService } from '@/user-system/services/auth/auth-service';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';

/**
 * Login page to log in a user
 */
@Component({
  components: {
    MasterPage,
    FormHeader,
  },
})
export default class Login extends Vue {
  /**
   * The user's email
   */
  public email: string = '';

  /**
   * The user's password
   */
  public password: string = '';

  /**
   * If the auth token should be saved for later use.
   */
  public rememberMe: boolean = true;


  /**
   * Attempt to log in the user
   */
  public async login(): Promise<void> {
    // alert(this.backendUrl);
    const form: HTMLFormElement = this.$refs.form as HTMLFormElement;

    const emailTB: HTMLInputElement = form.querySelector('#emailTB') as HTMLInputElement;
    const passwordTB: HTMLInputElement = form.querySelector('#passwordTB') as HTMLInputElement;





    // alert(r.value);

    // if (isEmailValid && isPasswordValid) {
    // console.log((this as any).backendUrl);
    // alert('Finish implementing this you dummy');
    // }
  }

  /**
   * Validate the email input from the textbox.
   */
  public validateEmail(element: any): boolean {
    return false;
    // return this.validateControl(element.target);
  }

  /**
   * Validate the password input from the textbox.
   */
  public validatePassword(element: any): boolean {
    return false;
    // return this.validateControl(element.target);
  }
}
</script>