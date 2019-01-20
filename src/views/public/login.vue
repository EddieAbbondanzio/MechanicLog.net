<template>
  <master-page>
    <login-form />
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form } from '@/components/shared/form/form';
import MasterPage from '@/components/shared/master-page.vue';
import { AuthService } from '@/user-system/services/auth/auth-service';
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
   * Attempt to log in the user
   */
  public async login(): Promise<void> {
    // alert(this.backendUrl);
    const form: HTMLFormElement = this.$refs.form as HTMLFormElement;

    const emailTB: HTMLInputElement = form.querySelector('#emailTB') as HTMLInputElement;
    const passwordTB: HTMLInputElement = form.querySelector('#passwordTB') as HTMLInputElement;

    // await this.loginUser(this.email, this.password, this.rememberMe);



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