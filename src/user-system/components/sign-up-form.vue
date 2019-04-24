<template>
    <card-container>
        <!-- Header -->
        <div class="p-3 pt-5 text-center" slot="header">
            <material-icon
                icon="person_add"
                color="secondary"
                size="xl"
                class="border rounded-circle p-3 bg-light"
            />
            <h2 class="pt-2">Sign Up</h2>
        </div>

        <b-alert variant="success" :show="successMessage.length > 0">{{ successMessage }}</b-alert>
        <b-alert variant="danger" :show="errorMessage.length > 0">{{ errorMessage }}</b-alert>

        <div class="p-3">
            <!-- Real Name -->
            <div class="form-group">
                <label class="required" for="name-textbox">Full Name</label>
                <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="name-textbox"
                    placeholder="John Smith"
                    :disabled="isLoading"
                    name="signUpName"
                    v-validate="'required|max:64'"
                    data-vv-validate-on="blur"
                >
                <b-form-invalid-feedback>{{ errors.first('signUpName') }}</b-form-invalid-feedback>
            </div>

            <b-form-group>
                <label class="required" for="username-textbox">Username</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="username"
                    id="username-textbox"
                    placeholder="HondaFan2000"
                    :disabled="isLoading"
                    name="signUpUsername"
                    v-validate="'required|alpha_num|min:4|max:32'"
                    data-vv-validate-on="blur"
                >
                <b-form-invalid-feedback>{{ errors.first('signUpUsername') }}</b-form-invalid-feedback>
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
                    :disabled="isLoading"
                    name="signUpEmail"
                    v-validate="'required|email|max:64'"
                    data-vv-validate-on="blur"
                >
                <small
                    class="form-text text-muted"
                >We promise to never share your email with anyone.</small>
                <b-form-invalid-feedback>{{ errors.first('signUpEmail') }}</b-form-invalid-feedback>
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
                    :disabled="isLoading"
                    name="signUpPassword"
                    v-validate="'required|min:8'"
                    data-vv-validate-on="blur"
                >
                <small class="form-text text-muted">Passwords must be at least 8 characters long.</small>
                <b-form-invalid-feedback>{{ errors.first('signUpPassword') }}</b-form-invalid-feedback>
            </div>

            <div class="form-group">
                <label class="required" for="password-confirm-textbox">Confirm Password</label>
                <input
                    v-model="confirmPassword"
                    type="password"
                    class="form-control mb-1"
                    id="password-confirm-textbox"
                    placeholder="********"
                    :disabled="isLoading"
                    name="signUpConfirmPassword"
                    v-validate="'required|confirmed:password'"
                    data-vv-validate-on="blur"
                >
                <b-form-invalid-feedback>{{ errors.first('signUpConfirmPassword') }}</b-form-invalid-feedback>
            </div>

            <div class="form-group pt-5">
                <!-- I Agree checkbox -->
                <div class="form-check mb-3">
                    <input
                        v-model="iAgree"
                        type="checkbox"
                        class="form-check-input"
                        id="i-agree-checkbox"
                        :disabled="isLoading"
                        name="signUpIAgree"
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                    >
                    <label
                        class="form-check-label required pl-1 align-middle"
                        for="i-agree-checkbox"
                    >I agree to the Terms of Use</label>
                    <b-form-invalid-feedback>{{ errors.first('signUpIAgree') }}</b-form-invalid-feedback>
                </div>

                <!-- Sign Up Button -->
                <b-btn
                    variant="primary"
                    @click="onSignUpButtonClicked"
                >{{ isLoading ? 'Loading' : 'Sign Up'}}</b-btn>
            </div>
        </div>
    </card-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserMixin } from '@/user-system/user-mixin';
import { User } from '@/user-system/entities/user';
import AlertMessage from '@/core/components/alert-message.vue';
import CardContainer from '@/core/components/cards/card-container.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import { EventBus } from '../../core/event/event-bus';

/**
 * Sign up form to allow new users to register.
 */
@Component({
    name: 'sign-up-form',
    components: {
        AlertMessage,
        CardContainer,
        MaterialIcon,
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

    public name: string = '';

    public email: string = '';

    public password: string = '';

    public username: string = '';

    public confirmPassword: string = '';

    public iAgree: boolean = false;

    public isLoading: boolean = false;

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
                signUpName: {
                    required: 'Name is required.',
                    max: 'Name must be 64 characters or less.',
                },

                signUpUsername: {
                    required: 'Username is required',
                    alpha_num: 'Username must only contain letters and/or numbers.',
                    min: 'Username must be 4 characters or more.',
                    max: 'Username must be 32 characters or less.',
                },
                signUpEmail: {
                    required: 'Contact email is required.',
                    email: 'Contact email must be a valid email address.',
                    max: 'Contact email must be 64 characters or less.',
                },
                signUpPassword: {
                    required: 'Password is required.',
                    min: 'Password must be 8 characters or more.',
                },
                signUpConfirmPassword: {
                    required: 'Password confirmation is required.',
                    confirmed: 'Password confirmation does not match password.',
                },
                signUpIAgree: {
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
            return;
        }

        try {
            EventBus.emit('loading');
            this.isLoading = true;
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
        } finally {
            this.isLoading = false;
            EventBus.emit('loaded');
        }
    }
}
</script>
