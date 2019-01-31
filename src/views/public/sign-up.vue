<template>
  <public-master-page>
    <sign-up-form @registered="onRegistered"/>
  </public-master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PublicMasterPage from '@/core/components/public/public-master-page.vue';
import SignUpForm from '@/user-system/components/sign-up-form.vue';

/**
 * Registration page that allows new users to sign up with the site.
 */
@Component({
  components: {
    PublicMasterPage,
    SignUpForm,
  },
})
export default class SignUp extends Vue {
  /**
   * On a successful registration, redirect to the email confirmation page.
   */
  public onRegistered(e: any): void {
    alert('HELLo');
    // this.$router.push({ name: 'home' });
  }
}
</script>