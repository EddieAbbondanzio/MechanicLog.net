<template>
  <master-page>
    <login-form ref="loginForm"/>
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form } from '@/components/shared/form/form';
import MasterPage from '@/components/shared/master-page.vue';
import { AuthService } from '@/user-system/services/auth/auth-service';
import { User } from '@/user-system/entities/user';
import LoginForm from '@/user-system/components/login-form.vue';

/**
 * Login page to log in a user
 */
@Component({
  components: {
    MasterPage,
    LoginForm,
  },
})
export default class Login extends Vue {
  public mounted(): void {
    const loginForm: LoginForm = this.$refs.loginForm as LoginForm;

    // Event handler for when a user successfully logs in.
    loginForm.onLogin.register((user: User) => {
      this.$router.push({ name: 'home' });
    });
  }
}
</script>