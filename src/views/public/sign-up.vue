<template>
  <master-page>
    <sign-up-form @registered="onRegistered"/>
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MasterPage from '@/core/components/master-page.vue';
import SignUpForm from '@/user-system/components/sign-up-form.vue';

@Component({
  components: {
    MasterPage,
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