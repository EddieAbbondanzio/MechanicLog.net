<template>
  <form-container
    title="Password Recovery"
    description="Please enter the email address associated with your account, and we'll send you a password reset code."
  >
    <div class="form-group">
      <label class="required" for="email-textbox">Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="email-textbox"
        placeholder="Email@domain.com"
        name="email"
        v-validate="'required|email'"
        data-vv-validate-on="blur"
      >
    </div>

    <form-error-list :form="this"/>
    <alert-message :type="message.type" v-if="message.text.length > 0">{{ message.text }}</alert-message>

    <div class="form-group mt-5">
      <form-submit-button text="Email Me" @click="onSendEmailButtonClick" ref="submitButton"/>
    </div>
  </form-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormContainer from '@/core/components/shared/form/form-container.vue';
import FormErrorList from '@/core/components/shared/form/form-error-list.vue';
import AlertMessage from '@/core/components/shared/alert-message.vue';
import { ThemeColor } from '@/core/components/shared/theme-color';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import FormSubmitButton from '@/core/components/shared/form/form-submit-button.vue';

/**
 * Password recovery form that will have a reset code emailed
 * to the user so they can recover their account.
 */
@Component({
  name: 'forgot-password-form',
  components: {
    FormContainer,
    FormErrorList,
    FormSubmitButton,
    AlertMessage,
  },
})
export default class ForgotPasswordForm extends UserMixin {
  /**
   * The email address of the user.
   */
  public email!: string;

  /**
   * The message being displayed to the user.
   */
  public message!: {
    text: string,
    color: ThemeColor,
  };

  /**
   * Initialize the component.
   */
  public created(): void {
    this.email = '';
    this.message = {
      text: '',
      color: 'danger',
    };
  }

  /**
   * Handler to send off an email to the user.
   */
  public async onSendEmailButtonClick(): Promise<void> {
    // If things aren't valid, stop.
    if (!(await this.$validator.validate())) {
      (this.$refs.submitButton as FormSubmitButton).reset();
      return;
    }

    try {
      await this.$requestPasswordReset(this.email);
    } catch (error) {
      this.message.text = error.message;
      (this.$refs.submitButton as FormSubmitButton).reset();
    }

    // Notify the parent page
    this.$emit('submit', this.email);
  }
}
</script>