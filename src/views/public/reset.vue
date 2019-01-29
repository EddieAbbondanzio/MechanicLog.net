<template>
  <master-page>
    <reset-password-form @submit="onFormSubmit"/>
  </master-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MasterPage from '@/core/components/master-page.vue';
import ResetPasswordForm from '@/user-system/components/reset-password-form.vue';

/**
 * Reset password page.
 */
@Component({
  components: {
    MasterPage,
    ResetPasswordForm,
  },
})
export default class Reset extends Vue {
  /**
   * Event handler to process a form submission.
   */
  public async onFormSubmit(): Promise<void> {
    this.$router.push({ name: 'home' });
  }
}
</script>