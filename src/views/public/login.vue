<template>
  <master-page>
    <div class="row my-5" style="min-height: 100%;">
      <div class="col-4 offset-4">
        <h3>Login</h3>

        <form>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="email-text-box"
              placeholder="Email@domain.com"
            >
          </div>
          <div class="form-group mb-5">
            <input
              type="password"
              class="form-control mb-1"
              id="password-text-box"
              placeholder="Password"
            >
            <a href="#" class="info-link">I forgot my password</a>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="remember-me-check-box">
            <label class="form-check-label" for="exampleCheck1">Remember Me</label>
          </div>
          <button type="submit" class="btn btn-primary" id="login-button">Login</button>
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
export default class Login extends Vue { }
</script>