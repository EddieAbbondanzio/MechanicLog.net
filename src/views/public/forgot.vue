<template>
  <master-page>
    <div>
      <forgot-password-form @submit="onFormSubmit"/>
    </div>
  </master-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MasterPage from '@/core/components/master-page.vue';
import ForgotPasswordForm from '@/user-system/components/forgot-password-form.vue';
import { UserMixin } from '@/user-system/mixins/user-mixin';

@Component({
  components: {
    MasterPage,
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