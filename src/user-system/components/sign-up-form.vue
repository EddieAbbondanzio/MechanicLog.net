<template>
    <form-container
        title="Sign Up"
        description="Sign up now to start your free 60 day trial with MechanicLog. No commitment or financial details needed."
    >
        <alert-message type="Success" v-if="successMessage.length > 0">{{ successMessage }}</alert-message>
        <alert-message type="Danger" v-if="errorMessage.length > 0">{{ errorMessage }}</alert-message>

        <!-- Real Name -->
        <div class="form-group">
            <label class="required" for="name-textbox">Full Name</label>
            <input
                v-model="name"
                type="text"
                class="form-control"
                id="name-textbox"
                placeholder="John Smith"
                name="name"
                v-validate="'required|max:64'"
                data-vv-validate-on="blur"
            >
            <b-form-invalid-feedback>{{ errors.first('name') }}</b-form-invalid-feedback>
        </div>

        <!-- Email Address -->
        <div class="form-group">
            <label class="required" for="email-textbox">Email</label>
            <input
                v-model="email"
                type="email"
                class="form-control"
                id="email-textbox"
                placeholder="Email@domain.com"
                name="email"
                v-validate="'required|email|max:64'"
                data-vv-validate-on="blur"
            >
            <small class="form-text text-muted">We promise to never share your email with anyone.</small>
            <b-form-invalid-feedback>{{ errors.first('email') }}</b-form-invalid-feedback>
        </div>
        <div class="form-group">
            <label class="required" for="password-textbox">Password</label>
            <input
                v-model="password"
                ref="password"
                type="password"
                class="form-control mb-1"
                id="password-textbox"
                placeholder="********"
                name="password"
                v-validate="'required|min:8'"
                data-vv-validate-on="blur"
            >
            <small class="form-text text-muted">Passwords must be at least 8 characters long.</small>
            <b-form-invalid-feedback>{{ errors.first('password') }}</b-form-invalid-feedback>
        </div>

        <div class="form-group">
            <label class="required" for="password-confirm-textbox">Confirm Password</label>
            <input
                v-model="confirmPassword"
                type="password"
                class="form-control mb-1"
                id="password-confirm-textbox"
                placeholder="********"
                name="confirmPassword"
                v-validate="'required|confirmed:password'"
                data-vv-validate-on="blur"
            >
            <b-form-invalid-feedback>{{ errors.first('confirmPassword') }}</b-form-invalid-feedback>
        </div>

        <div class="pt-5">
            <!-- Sign Up Button -->
            <form-submit-button text="Sign Up" @click="onSignUpButtonClicked" ref="button"/>

            <!-- I Agree checkbox -->
            <div class="form-group form-check d-inline-block ml-3">
                <input
                    v-model="iAgree"
                    type="checkbox"
                    class="form-check-input"
                    id="i-agree-checkbox"
                    name="iAgree"
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                >
                <label
                    class="form-check-label required"
                    for="i-agree-checkbox"
                >I agree to the Terms of Use</label>
                <b-form-invalid-feedback>{{ errors.first('iAgree') }}</b-form-invalid-feedback>
            </div>
        </div>
    </form-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import { User } from '@/user-system/entities/user';
import AlertMessage from '@/core/components/alert-message.vue';
import FormContainer from '@/core/components/form/form-container.vue';
import FormSubmitButton from '@/core/components/form/form-submit-button.vue';

/**
 * Sign up form to allow new users to register.
 */
@Component({
    name: 'sign-up-form',
    components: {
        FormContainer,
        FormSubmitButton,
        AlertMessage,
    },
})
export default class SignUpForm extends UserMixin {
    /**
     * Error from the server on a failed login.
     */
    public errorMessage!: string;

    /**
     * Success message for when a login succeeds.
     */
    public successMessage!: string;

    public name!: string;

    public email!: string;

    public password!: string;

    public confirmPassword!: string;

    public iAgree!: boolean;

    /**
     * Properties are assigned in created to prevent weird undefined errors.
     */
    public created(): void {
        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.iAgree = false;
        this.errorMessage = '';
        this.successMessage = '';

        // Custom error messages.
        this.$validator.localize('en', {
            custom: {
                confirmPassword: {
                    required: 'The password confirmation field is required.',
                    confirmed: 'Confirm password does not match password.',
                },
                iAgree: {
                    required: 'The Terms of Use must be agreed to.',
                },
            },
        });
    }

    /**
     * User wants to log in. Validate the email, and password
     * inputs first, then send off a request to the back end.
     */
    public async onSignUpButtonClicked(event: any): Promise<void> {
        // Validate first.
        if (!(await this.$validator.validate())) {
            (this.$refs.button as FormSubmitButton).reset();
            return;
        }

        try {
            const u: User | null = await this.$register({
                email: this.email,
                name: this.name,
                password: this.password,
            });

            // If the registration was successful, fire off the event.
            if (u != null) {
                this.errorMessage = '';
                this.successMessage = 'Success. Redirecting...';

                // Propogate the event to the parent (page)
                this.$emit('registered', u);
            } else {
                this.errorMessage =
                    'Failed to register. Please try again later';
            }

            // Hi
        } catch (error) {
            // Alert the user of what went wrong
            this.errorMessage = error.message;
            this.successMessage = '';
        }

        this.$forceUpdate();
    }
}
</script>
