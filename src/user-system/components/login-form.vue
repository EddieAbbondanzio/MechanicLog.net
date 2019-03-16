<template>
    <form-container title="Login">
        <b-alert variant="danger" :show="message.length > 0">{{ message }}</b-alert>

        <div class="form-group">
            <label for="email-textbox">Email</label>
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
                name="password"
                v-validate="'required'"
                data-vv-validate-on="blur"
                @keyup.enter="onLoginButtonClicked"
            >
            <b-form-invalid-feedback>{{ errors.first('password') }}</b-form-invalid-feedback>

            <router-link class="info-link" to="/forgot" tabindex="-1">I forgot my password</router-link>
        </div>

        <div class="form-group mt-5">
            <form-submit-button text="Login" @click="onLoginButtonClicked" ref="submitButton"/>

            <!-- <div class="form-check d-inline-block ml-3">
                <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="form-check-input"
                    id="remember-me-check-box"
                >
                <label class="form-check-label" for="remember-me-check-box">Remember Me</label>
            </div>-->
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
import { Nullable } from '@/core/common/monads/nullable';
import AutoComplete from '@/core/components/inputs/auto-complete.vue';

/**
 * Login form to allow a user to sign in.
 */
@Component({
    name: 'login-form',
    components: {
        FormContainer,
        FormSubmitButton,
        AlertMessage,
        AutoComplete,
    },
})
export default class LoginForm extends UserMixin {
    /**
     * The email of the user.
     */
    public email!: string;

    /**
     * The password of the user.
     */
    public password!: string;

    /**
     * If the user wants to save their login for re-use
     * next time they visit the site.
     */
    public rememberMe!: boolean;

    public message: string = '';

    /**
     * Properties are assigned in created to prevent weird undefined errors.
     */
    public created(): void {
        this.email = '';
        this.password = '';
        this.rememberMe = false;
    }

    /**
     * User wants to log in. Validate the email, and password
     * inputs first, then send off a request to the back end.
     */
    public async onLoginButtonClicked(event: any): Promise<void> {
        const submitButton: FormSubmitButton = this.$refs.submitButton as FormSubmitButton;

        // Validate first.
        if (!(await this.$validator.validate())) {
            submitButton.reset();
            return;
        }

        try {
            const u = await this.$userStore.login(this.email, this.password, this.rememberMe);

            // Propogate the event to the parent (page)
            this.$emit('login', u);
        } catch (error) {
            this.message = error.message;
            submitButton.reset();
        }
    }
}
</script>
