<template>
    <form-container
        title="Sign Up"
        description="Sign up now to start your free 60 day trial with MechanicLog. No commitment or financial details needed."
    >
        <b-alert variant="success" :show="successMessage.length > 0">{{ successMessage }}</b-alert>
        <b-alert variant="danger" :show="errorMessage.length > 0">{{ errorMessage }}</b-alert>

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

        <b-form-group>
            <label class="required" for="username-textbox">Username</label>
            <input
                type="text"
                class="form-control"
                v-model="username"
                id="username-textbox"
                placeholder="HondaFan2000"
                name="username"
                v-validate="'required|alpha_num|min:4|max:32'"
                data-vv-validate-on="blur"
            >
            <b-form-invalid-feedback>{{ errors.first('username') }}</b-form-invalid-feedback>
        </b-form-group>

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
import { UserMixin } from '@/user-system/user-mixin';
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

    public username: string = '';

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
                name: {
                    required: 'Name is required.',
                    max: 'Name must be 64 characters or less.',
                },

                username: {
                    required: 'Username is required',
                    alpha_num: 'Username must only contain letters and/or numbers.',
                    min: 'Username must be 4 characters or more.',
                    max: 'Username must be 32 characters or less.',
                },
                email: {
                    required: 'Contact email is required.',
                    email: 'Contact email must be a valid email address.',
                    max: 'Contact email must be 64 characters or less.',
                },
                password: {
                    required: 'Password is required.',
                    min: 'Password must be 8 characters or more.',
                },
                confirmPassword: {
                    required: 'Password confirmation is required.',
                    confirmed: 'Password confirmation does not match password.',
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
            const u = await this.$userStore.register({
                email: this.email,
                name: this.name,
                password: this.password,
                username: this.username,
            });

            this.successMessage = 'Success. Redirecting...';
            this.errorMessage = '';

            this.$emit('registered', u);
        } catch (error) {
            // Alert the user of what went wrong
            this.errorMessage = error.message;
            this.successMessage = '';
            (this.$refs.button as FormSubmitButton).reset();
        }

        this.$forceUpdate();
    }
}
</script>
