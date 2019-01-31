<template>
  <public-master-page>
    <div>
      <forgot-password-form @submit="onFormSubmit"/>
    </div>
  </public-master-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PublicMasterPage from '@/core/components/public/public-master-page.vue';
import ForgotPasswordForm from '@/user-system/components/forgot-password-form.vue';
import { UserMixin } from '@/user-system/mixins/user-mixin';

@Component({
  components: {
    PublicMasterPage,
    ForgotPasswordForm,
  },
})
export default class Forgot extends Vue {
  /**
   * Event handler for when the form is submitted.
   */
  public async onFormSubmit(email: string): Promise<void> {
    this.$router.push({ name: 'reset' });
  }
}
</script>