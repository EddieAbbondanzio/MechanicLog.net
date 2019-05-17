<template>
    <card-container>
        <!-- Header -->
        <div class="p-3 pt-5 text-center" slot="header">
            <material-icon
                icon="person"
                color="secondary"
                size="xl"
                class="border rounded-circle p-3 bg-light"
            />
            <h2 class="pt-2">Login</h2>
        </div>

        <!-- Content -->
        <div class="p-3">
            <b-alert variant="danger" :show="message.length > 0">{{ message }}</b-alert>

            <div class="form-group">
                <label for="email-textbox" class="required">Email</label>
                <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="email-textbox"
                    placeholder="Email@domain.com"
                    ref="emailTextbox"
                    :disabled="isLoading"
                    name="loginEmail"
                    v-validate="'required|email'"
                    data-vv-validate-on="blur"
                >
                <b-form-invalid-feedback>{{ errors.first('loginEmail') }}</b-form-invalid-feedback>
            </div>
            <div class="form-group">
                <label for="email-textbox" class="required">Password</label>
                <input
                    v-model="password"
                    type="password"
                    class="form-control mb-1"
                    id="password-textbox"
                    placeholder="********"
                    ref="passwordTextbox"
                    :disabled="isLoading"
                    name="loginPassword"
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    @keyup.enter="onLoginButtonClicked"
                >
                <b-form-invalid-feedback>{{ errors.first('loginPassword') }}</b-form-invalid-feedback>

                <router-link class="info-link" to="/forgot" tabindex="-1">I forgot my password</router-link>
            </div>

            <div class="form-group pt-3">
                <div class="form-check mb-3 d-none">
                    <input
                        v-model="rememberMe"
                        type="checkbox"
                        class="form-check-input"
                        id="remember-me-check-box"
                    >
                    <label
                        class="form-check-label pl-1 align-middle"
                        for="remember-me-check-box"
                    >Remember Me</label>
                </div>

                <b-btn
                    @click="onLoginButtonClicked"
                    variant="primary"
                    :disabled="isLoading"
                >{{ isLoading ? 'Logging in' : 'Login'}}</b-btn>
            </div>
        </div>
    </card-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { UserMixin } from "@/user-system/mixins/user-mixin";
import { User } from "@/user-system/entities/user";
import AlertMessage from "@/core/components/alert-message.vue";
import { Nullable } from "@/core/common/monads/nullable";
import AutoComplete from "@/core/components/inputs/auto-complete.vue";
import { AuthenticationError } from "@/core/common/errors/authentication-error";
import { EventBus } from "../../core/event/event-bus";
import { CookieStorage } from "@/core/cookie-storage";
import CardContainer from "@/core/components/cards/card-container.vue";
import MaterialIcon from "@/core/components/material-icon.vue";

/**
 * Login form to allow a user to sign in.
 */
@Component({
    name: "login-form",
    components: {
        CardContainer,
        AlertMessage,
        AutoComplete,
        MaterialIcon
    }
})
export default class LoginForm extends UserMixin {
    public $refs!: {
        submitButton: HTMLButtonElement;
        emailTextbox: HTMLInputElement;
        passwordTextbox: HTMLInputElement;
    };

    /**
     * The email of the user.
     */
    public email: string = "";

    /**
     * The password of the user.
     */
    public password: string = "";

    /**
     * If the user wants to save their login for re-use
     * next time they visit the site.
     */
    public rememberMe: boolean = false;

    public isLoading: boolean = false;

    public message: string = "";

    /**
     * Initialize the error messages of the validator.
     */
    public created() {
        // Custom error messages.
        this.$validator.localize("en", {
            custom: {
                loginEmail: {
                    email: "Email must be a valid email address.",
                    required: "Email address is required."
                },
                loginPassword: {
                    required: "Password is required."
                }
            }
        });
    }

    /**
     * Properties are assigned in created to prevent weird undefined errors.
     */
    public async mounted() {
        this.email = "";
        this.password = "";
        this.rememberMe = false;

        if (CookieStorage.exists("auth")) {
            EventBus.emit("loading");
            this.isLoading = true;

            try {
                this.$refs.emailTextbox.disabled = true;
                this.$refs.passwordTextbox.disabled = true;

                const login = await this.$userStore.relogin(
                    CookieStorage.get("auth")
                );
                this.$emit("login", login);
            } catch (error) {
                CookieStorage.clear("auth");
            } finally {
                this.$refs.emailTextbox.disabled = false;
                this.$refs.passwordTextbox.disabled = false;
                this.isLoading = false;
                EventBus.emit("loaded");
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
            return;
        }

        try {
            EventBus.emit("loading");
            this.isLoading = true;
            const u = await this.$userStore.login(
                this.email,
                this.password,
                this.rememberMe
            );

            // Propogate the event to the parent (page)
            this.$emit("login", u);
        } catch (error) {
            if (error instanceof AuthenticationError) {
                this.message = "Invalid email and/or password.";
            } else {
                this.message =
                    "An unknown error occured. Please try again later.";
            }
        }
        this.isLoading = false;
        EventBus.emit("loaded");
    }
}
</script>
