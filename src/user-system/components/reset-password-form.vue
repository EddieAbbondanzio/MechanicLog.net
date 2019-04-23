<template>
    <card-container>
        <!-- Header -->
        <div class="p-3 pt-5 text-center" slot="header">
            <material-icon
                icon="lock_open"
                color="secondary"
                size="xl"
                class="border rounded-circle p-3 bg-light"
            />
            <h2 class="pt-2">Password Reset</h2>
        </div>

        <div class="p-3">
            <alert-message :color="message.color" v-if="message.text.length > 0">{{ message.text }}</alert-message>

            <!-- Email -->
            <div class="form-group">
                <label class="required" for="email-textbox">Email</label>
                <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="email-textbox"
                    placeholder="Email@domain.com"
                    :disabled="true"
                    name="email"
                    v-validate="'required|email'"
                    data-vv-validate-on="blur"
                >
                <b-form-invalid-feedback>{{ errors.first('email') }}</b-form-invalid-feedback>
            </div>

            <!-- Reset Code -->
            <div class="form-group">
                <label class="required" for="password-textbox">Reset Code</label>
                <input
                    v-model="resetCode"
                    type="text"
                    class="form-control mb-1"
                    id="reset-code-textbox"
                    placeholder="ABC123"
                    :disabled="isLoading"
                    name="resetcode"
                    v-validate="'required|min:8'"
                    data-vv-validate-on="blur"
                >
                <b-form-invalid-feedback>{{ errors.first('resetcode') }}</b-form-invalid-feedback>
            </div>

            <!-- New Password -->
            <div class="form-group">
                <label class="required" for="password-textbox">Password</label>
                <input
                    v-model="newPassword"
                    type="password"
                    class="form-control mb-1"
                    id="password-textbox"
                    placeholder="********"
                    :disabled="isLoading"
                    name="password"
                    v-validate="'required|min:8'"
                    data-vv-validate-on="blur"
                    ref="password"
                >
                <small class="form-text text-muted">Passwords must be at least 8 characters long.</small>
                <b-form-invalid-feedback>{{ errors.first('password') }}</b-form-invalid-feedback>
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
                <label class="required" for="password-confirm-textbox">Confirm Password</label>
                <input
                    v-model="confirmPassword"
                    type="password"
                    class="form-control mb-1"
                    id="password-confirm-textbox"
                    placeholder="********"
                    :disabled="isLoading"
                    name="confirmPassword"
                    v-validate="'required|confirmed:password'"
                    data-vv-validate-on="blur"
                >
                <b-form-invalid-feedback>{{ errors.first('confirmPassword') }}</b-form-invalid-feedback>
            </div>

            <div class="form-group mt-5">
                <b-btn
                    variant="primary"
                    @click="onResetPasswordButtonClick"
                >{{ isLoading ? 'Loading' : 'Reset Password' }}</b-btn>
            </div>
        </div>
    </card-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import AlertMessage from '@/core/components/alert-message.vue';
import { UserPasswordReset } from '@/user-system/services/auth/user-password-reset';
import { UserMixin } from '@/user-system/user-mixin';
import { ThemeColor } from '@/core/components/theme-color';
import CardContainer from '@/core/components/cards/card-container.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import { EventBus } from '../../core/event/event-bus';

/**
 * Form to reset a user's password using the password reset
 * code they were emailed.
 */
@Component({
    name: 'reset-password-form',
    components: {
        AlertMessage,
        CardContainer,
        MaterialIcon,
    },
})
export default class ResetPasswordForm extends UserMixin {
    /**
     * The user's email
     */
    public email: string = '';

    public resetCode: string = '';

    public newPassword: string = '';

    public confirmPassword: string = '';

    public isLoading: boolean = false;

    /**
     * The message being displayed to the user.
     */
    public message: {
        text: string;
        color: ThemeColor;
    } = { text: '', color: 'danger' };

    /**
     * Autopopulate the users email to amp up that wow factor to 11.
     */
    public mounted() {
        this.email = this.$route.params.email;
    }

    public async onResetPasswordButtonClick(): Promise<void> {
        // If things aren't valid, stop.
        if (!(await this.$validator.validate())) {
            return;
        }

        try {
            EventBus.emit('loading');
            this.isLoading = true;
            await this.$userStore.resetPassword({
                email: this.email,
                resetToken: this.resetCode,
                newPassword: this.newPassword,
            } as UserPasswordReset);

            // Propogate the event up
            this.$emit('submit');
        } catch (error) {
            this.message.color = 'danger';
            this.message.text = error.message;
        } finally {
            EventBus.emit('loaded');
            this.isLoading = false;
        }
    }
}
</script>