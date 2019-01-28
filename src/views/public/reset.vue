<template>
  <master-page>
      <reset-password-form/>
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
}
</script>