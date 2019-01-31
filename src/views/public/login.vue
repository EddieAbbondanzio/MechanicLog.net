<template>
  <public-master-page>
    <login-form @login="onLogin"/>
  </public-master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthService } from '@/user-system/services/auth/auth-service';
import PublicMasterPage from '@/core/components/public/public-master-page.vue';
import { User } from '@/user-system/entities/user';
import LoginForm from '@/user-system/components/login-form.vue';

/**
 * Login page to log in a user
 */
@Component({
  components: {
    PublicMasterPage,
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