


<template>
    <page-content>
        <error-popup ref="errorPopup"/>

        <div slot="tool-bar">
            <span class="text-muted">Settings</span>
        </div>

        <div class="container-fluid">
            <div class="row py-3">
                <div class="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
                    <card-container>
                        <h4>Account Info</h4>
                        <hr class="pt-0 mt-0">

                        <b-form>
                            <div class="form-group">
                                <label for="name-textbox">Username</label>
                                <input
                                    v-model="username"
                                    type="text"
                                    class="form-control"
                                    id="name-textbox"
                                    placeholder
                                    name="name"
                                    readonly
                                >
                            </div>

                            <div class="form-group">
                                <label class="required" for="name-textbox">Name</label>
                                <input
                                    v-model="name"
                                    type="text"
                                    class="form-control"
                                    id="name-textbox"
                                    placeholder="John Smith"
                                    name="name"
                                    data-vv-scope="accountInfo"
                                    v-validate="'required|max:64'"
                                >
                                <b-form-invalid-feedback>{{ errors.first('accountInfo.name') }}</b-form-invalid-feedback>
                            </div>

                            <div class="form-group">
                                <label class="required" for="email-textbox">Email</label>
                                <input
                                    v-model="email"
                                    type="email"
                                    class="form-control"
                                    id="email-textbox"
                                    placeholder="Email@domain.com"
                                    name="email"
                                    data-vv-scope="accountInfo"
                                    v-validate="'required|email|max:64'"
                                >
                                <b-form-invalid-feedback>{{ errors.first('accountInfo.email') }}</b-form-invalid-feedback>
                            </div>
                        </b-form>
                    </card-container>
                </div>
            </div>

            <div class="row pb-3">
                <div class="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
                    <card-container>
                        <h4>Password</h4>
                        <hr class="pt-0 mt-0">

                        <b-form>
                            <b-form-group>
                                <label for="new-password-textbox">New Password</label>
                                <input
                                    id="new-password-textbox"
                                    class="form-control"
                                    type="password"
                                    placeholder="********"
                                    ref="newPassword"
                                    name="newPassword"
                                    v-model="newPassword"
                                    data-vv-scope="password"
                                    v-validate="'required|min:8'"
                                >
                                <b-form-invalid-feedback>{{ errors.first('password.newPassword') }}</b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group>
                                <label for="confirm-password-textbox">Confirm New Password</label>
                                <input
                                    id="confirm-password-textbox"
                                    class="form-control"
                                    type="password"
                                    placeholder="********"
                                    v-model="confirmNewPassword"
                                    name="confirmNewPassword"
                                    data-vv-scope="password"
                                    v-validate="'required|min:8|confirmed:newPassword'"
                                >
                                <b-form-invalid-feedback>{{ errors.first('password.confirmNewPassword') }}</b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group v-if="newPassword != null && newPassword.length > 0">
                                <label
                                    class="required"
                                    for="current-password-textbox"
                                >Current Password</label>
                                <input
                                    id="current-password-textbox"
                                    class="form-control"
                                    type="password"
                                    placeholder="********"
                                    v-model="currentPassword"
                                    name="currentPassword"
                                    data-vv-scope="password"
                                    v-validate="'required'"
                                >
                                <b-form-invalid-feedback>{{ errors.first('password.currentPassword') }}</b-form-invalid-feedback>
                            </b-form-group>
                        </b-form>
                    </card-container>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
                    <card-container class="clearfix">
                        <b-btn
                            variant="outline-secondary"
                            @click="onResetClick"
                            :disabled="isLoading"
                        >Reset</b-btn>
                        <b-btn
                            class="float-right"
                            variant="success"
                            @click="onUpdateClick"
                            :disabled="isLoading"
                        >{{ isLoading ? 'Updating' : 'Update' }}</b-btn>
                    </card-container>
                </div>
            </div>
        </div>
    </page-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import CardContainer from '@/core/components/cards/card-container.vue';
import { User } from '@/user-system/entities/user';
import { Nullable } from '@/core/common/monads/nullable';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import * as HttpStatusCodes from 'http-status-codes';
import PageContent from '@/core/components/layout/page-content.vue';
import { EventBus } from '@/core/event/event-bus';

/**
 * Settings page for updating the user.
 */
@Component({
    name: 'settings-page',
    components: {
        CardContainer,
        ErrorPopup,
        PageContent,
    },
})
export default class Settings extends UserMixin {
    /**
     * Component references
     */
    public $refs!: {
        errorPopup: ErrorPopup;
    };

    /**
     * The username of the user.
     */
    public username: string = User.CURRENT!.username;

    /**
     * The current name of the user.
     */
    public name: string = User.CURRENT!.name;

    /**
     * The contact email of the user.
     */
    public email: string = User.CURRENT!.email;

    /**
     * The new password they want.
     */
    public newPassword: Nullable<string> = null;

    /**
     * Confirmation of the new password.
     */
    public confirmNewPassword: Nullable<string> = null;

    /**
     * Their current password for authentication.
     */
    public currentPassword: Nullable<string> = null;

    public isLoading: boolean = false;

    /**
     * Prepare the component for use when generated.
     */
    public async created(): Promise<void> {
        this.$validator.localize('en', {
            custom: {
                name: {
                    required: 'Name is required.',
                    max: 'Name must be 64 characters or less.',
                },
                email: {
                    required: 'Email is required.',
                    email: 'Email must be valid.',
                    max: 'Email must be 64 characters or less.',
                },
                newPassword: {
                    required: 'New password is required.',
                    min: 'New password must be 8 characters or more.',
                },
                confirmNewPassword: {
                    required: 'Confirmation password is required.',
                    min: 'Confirmation password must be 8 characters or more.',
                    confirmed: 'Confirmation password does not match.',
                },
                currentPassword: {
                    required: 'Current password is required.',
                },
            },
        });
    }

    /**
     * Event handler for sending off the update request.
     */
    public async onUpdateClick(): Promise<void> {
        if (!(await this.$validator.validateAll('accountInfo'))) {
            return;
        }

        EventBus.emit('loading');
        this.isLoading = true;
        await this.$userStore.updateInfo({ name: this.name, email: this.email });

        if (this.newPassword != null) {
            try {
                await this.$userStore.updatePassword({ currentPassword: this.currentPassword!, newPassword: this.newPassword! });
                this.newPassword = null;
                this.confirmNewPassword = null;
                this.currentPassword = null;
            } catch (error) {
                this.$refs.errorPopup.show(error.message);
            }
        }

        this.isLoading = false;
        EventBus.emit('loaded');
    }

    /**
     * Event handler to reset the form back to it's initial state.
     */
    public async onResetClick(): Promise<void> {
        this.$validator.reset();
        this.name = User.CURRENT!.name;
        this.email = User.CURRENT!.email;
        this.newPassword = null;
        this.confirmNewPassword = null;
        this.currentPassword = null;
    }
}
</script>