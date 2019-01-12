<template>
  <master-page>
    <div class="row my-5" style="min-height: 100%;">
      <div class="col-4 offset-4">
        <h3>Login</h3>

        <form>
          <div class="form-group">
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email-text-box"
              placeholder="Email@domain.com"
            >
          </div>
          <div class="form-group mb-5">
            <input
              v-model="password"
              type="password"
              class="form-control mb-1"
              id="password-text-box"
              placeholder="Password"
            >
            <router-link class="info-link" to="/forgot">I forgot my password</router-link>
          </div>
          <div class="form-group form-check">
            <input v-model="rememberMe" type="checkbox" class="form-check-input" id="remember-me-check-box">
            <label class="form-check-label" for="remember-me-check-box">Remember Me</label>
          </div>
          <button type="submit" class="btn btn-primary" id="login-button" @click="login">Login</button>
        </form>
      </div>
    </div>
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MasterPage from '@/components/shared/master-page.vue';

@Component({
  components: {
    MasterPage,
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
  public login(): void {
    alert('Finish implementing this you dummy');
  }
}
</script>