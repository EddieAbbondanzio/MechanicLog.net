<template>
    <card-container class="h-50 w-50">
        <!-- <div style="width: 50%; display: inline-block"> -->
        <!-- <form-container title="Login"> -->
        <b-alert variant="danger" :show="message.length > 0">{{ message }}</b-alert>

        <div class="form-group">
            <label for="email-textbox">Email</label>
            <input
                v-model="email"
                type="email"
                class="form-control"
                id="email-textbox"
                placeholder="Email@domain.com"
                ref="emailTextbox"
                name="email"
                v-validate="'required|email'"
                data-vv-validate-on="blur"
            >
            <b-form-invalid-feedback>{{ errors.first('email') }}</b-form-invalid-feedback>
        </div>
        <div class="form-group">
            <label for="email-textbox">Password</label>
            <input
                v-model="password"
                type="password"
                class="form-control mb-1"
                id="password-textbox"
                placeholder="********"
                ref="passwordTextbox"
                name="password"
                v-validate="'required'"
                data-vv-validate-on="blur"
                @keyup.enter="onLoginButtonClicked"
            >
            <b-form-invalid-feedback>{{ errors.first('password') }}</b-form-invalid-feedback>

            <router-link class="info-link" to="/forgot" tabindex="-1">I forgot my password</router-link>
        </div>

        <div class="form-group mt-5">
            <loading-bar v-if="isLoading" class="mb-3"/>
            <form-submit-button text="Login" @click="onLoginButtonClicked" ref="submitButton"/>

            <div class="form-check d-inline-block ml-3">
                <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="form-check-input"
                    id="remember-me-check-box"
                >
                <label class="form-check-label" for="remember-me-check-box">Remember Me</label>
            </div>
        </div>
        <!-- </div> -->
    </card-container>
    <!-- </form-container> -->
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserMixin } from '@/user-system/user-mixin';
import { User } from '@/user-system/entities/user';
import AlertMessage from '@/core/components/alert-message.vue';
import FormSubmitButton from '@/core/components/form/form-submit-button.vue';
import { Nullable } from '@/core/common/monads/nullable';
import AutoComplete from '@/core/components/inputs/auto-complete.vue';
import { AuthenticationError } from '@/core/common/errors/authentication-error';
import { EventBus } from '../../core/event/event-bus';
import { CookieStorage } from '@/core/cookie-storage';
import LoadingBar from '@/core/components/ux/loading-bar.vue';
import CardContainer from '@/core/components/cards/card-container.vue';

/**
 * Login form to allow a user to sign in.
 */
@Component({
    name: 'login-form',
    components: {
        CardContainer,
        FormSubmitButton,
        AlertMessage,
        AutoComplete,
        LoadingBar,
    },
})
export default class LoginForm extends UserMixin {
    public $refs!: {
        submitButton: FormSubmitButton;
        emailTextbox: HTMLInputElement;
        passwordTextbox: HTMLInputElement;
    };

    /**
     * The email of the user.
     */
    public email: string = '';

    /**
     * The password of the user.
     */
    public password: string = '';

    /**
     * If the user wants to save their login for re-use
     * next time they visit the site.
     */
    public rememberMe: boolean = false;

    public isLoading: boolean = false;

    public message: string = '';

    /**
     * Properties are assigned in created to prevent weird undefined errors.
     */
    public async mounted() {
        this.email = '';
        this.password = '';
        this.rememberMe = false;

        if (CookieStorage.exists('auth')) {
            this.isLoading = true;

            try {
                this.$refs.emailTextbox.disabled = true;
                this.$refs.passwordTextbox.disabled = true;

                this.$refs.submitButton.trigger();
                const login = await this.$userStore.relogin(CookieStorage.get('auth'));
                this.$emit('login', login);
            } catch (error) {
                CookieStorage.clear('auth');
            } finally {
                this.$refs.emailTextbox.disabled = false;
                this.$refs.passwordTextbox.disabled = false;
                this.$refs.submitButton.reset();
                this.isLoading = false;
            }
        }
    }

    /**
     * User wants to log in. Validate the email, and password
     * inputs first, then send off a request to the back end.
     */
    public async onLoginButtonClicked(event: any): Promise<void> {
        // Validate first.
        if (!(await this.$validator.validate())) {
            this.$refs.submitButton.reset();
            return;
        }

        try {
            this.isLoading = true;
            const u = await this.$userStore.login(this.email, this.password, this.rememberMe);

            // Propogate the event to the parent (page)
            this.$emit('login', u);
        } catch (error) {
            if (error instanceof AuthenticationError) {
                this.message = 'Invalid email and/or password.';
            } else {
                this.message = 'An unknown error occured. Please try again later.';
            }

            this.$refs.submitButton.reset();
        }
        this.isLoading = false;
    }
}
</script>
