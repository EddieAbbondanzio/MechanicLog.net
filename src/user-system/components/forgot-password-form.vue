<template>
    <card-container>
        <!-- Header -->
        <div class="p-3 pt-5 text-center" slot="header">
            <material-icon
                icon="lock"
                color="secondary"
                size="xl"
                class="border rounded-circle p-3 bg-light"
            />
            <h2 class="pt-2">Password Recovery</h2>
        </div>

        <div>
            <div class="form-group">
                <label class="required" for="email-textbox">Email</label>
                <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="email-textbox"
                    placeholder="Email@domain.com"
                    :disabled="isLoading"
                    name="forgotEmail"
                    v-validate="'required|email'"
                    data-vv-validate-on="blur"
                >
                <b-form-invalid-feedback>{{ errors.first('forgotEmail') }}</b-form-invalid-feedback>
            </div>

            <alert-message :type="message.type" v-if="message.text.length > 0">{{ message.text }}</alert-message>

            <div class="form-group mt-5">
                <b-btn
                    variant="primary"
                    @click="onSendEmailButtonClick"
                >{{ isLoading ? 'Loading' : 'Send Me a Reset Code' }}</b-btn>
            </div>
        </div>
    </card-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import AlertMessage from '@/core/components/alert-message.vue';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import { ThemeColor } from '@/core/components/theme-color';
import CardContainer from '@/core/components/cards/card-container.vue';
import { EventBus } from '../../core/event/event-bus';
import MaterialIcon from '@/core/components/material-icon.vue';

/**
 * Password recovery form that will have a reset code emailed
 * to the user so they can recover their account.
 */
@Component({
    name: 'forgot-password-form',
    components: {
        AlertMessage,
        CardContainer,
        MaterialIcon,
    },
})
export default class ForgotPasswordForm extends UserMixin {
    /**
     * The email address of the user.
     */
    public email: string = '';

    /**
     * The message being displayed to the user.
     */
    public message!: {
        text: string;
        color: ThemeColor;
    };

    public isLoading: boolean = false;

    /**
     * Initialize the component.
     */
    public created(): void {
        this.$validator.localize('en', {
            custom: {
                forgotEmail: {
                    email: 'Email must be a valid email address.',
                    required: 'Email address is required.',
                },
            },
        });

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
            return;
        }

        try {
            EventBus.emit('loading');
            this.isLoading = true;

            await this.$userStore.requestPasswordReset(this.email);
        } catch (error) {
            this.message.text = error.message;
        } finally {
            EventBus.emit('loaded');
            this.isLoading = false;
            this.$emit('submit', this.email);
        }
    }
}
</script>