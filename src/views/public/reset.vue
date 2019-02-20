<template>
  <public-master-page>
    <reset-password-form @submit="onFormSubmit"/>
  </public-master-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PublicMasterPage from '@/core/components/public/public-master-page.vue';
import ResetPasswordForm from '@/user-system/components/reset-password-form.vue';

/**
 * Reset password page.
 */
@Component({
  components: {
    PublicMasterPage,
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