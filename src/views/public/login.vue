<template>
  <master-page>
    <login-form @login="onLogin"/>
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MasterPage from '@/core/components/master-page.vue';
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
  /**
   * On a successful login, redirect to the dashboard.
   */
  public onLogin(e: any): void {
    this.$router.push({ name: 'dashboard' });
  }
}
</script>