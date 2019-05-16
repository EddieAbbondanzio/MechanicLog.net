<template>
    <card-container>
        <!-- Header -->
        <div class="p-3 pt-5 text-center" slot="header">
            <material-icon
                icon="contact_support"
                color="secondary"
                size="xl"
                class="border rounded-circle p-3 bg-light"
            />
            <h2 class="pt-2">Contact Support</h2>
        </div>

        <!-- Content -->
        <div class="p-3">
            <b-alert variant="danger" :show="message.length > 0">{{ message }}</b-alert>

            <!-- Email Address -->
            <b-form v-if="!submitted">
                <b-form-group>
                    <label class="required" for="email-textbox">Email</label>
                    <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        id="email-textbox"
                        placeholder="Email@domain.com"
                        :disabled="isLoading"
                        name="contactEmail"
                        v-validate="'required|email|max:64'"
                        data-vv-validate-on="blur"
                    >
                    <b-form-invalid-feedback>{{ errors.first('contactEmail') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group>
                    <label for="subject-textbox">
                        Subject
                        <span class="text-muted">(optional, but helpful)</span>
                    </label>
                    <input
                        v-model="subject"
                        type="text"
                        class="form-control"
                        id="subject-textbox"
                        placeholder
                        :disabled="isLoading"
                        name="contactSubject"
                        v-validate="'max:128'"
                        data-vv-validate-on="blur"
                    >
                    <b-form-invalid-feedback>{{ errors.first('contactSubject') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group>
                    <label class="required" for="body-textbox">Message</label>
                    <b-textarea
                        v-model="body"
                        type="text"
                        class="form-control"
                        id="body-textbox"
                        rows="4"
                        max-rows="8"
                        :disabled="isLoading"
                        name="contactBody"
                        v-validate="'required|max:2048'"
                        data-vv-validate-on="blur"
                    ></b-textarea>
                    <b-form-invalid-feedback>{{ errors.first('contactBody') }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group class="pt-3">
                    <b-btn
                        @click="onSendButtonClicked"
                        variant="primary"
                        :disabled="isLoading"
                    >{{ isLoading ? 'Loading' : 'Send Message'}}</b-btn>
                </b-form-group>
            </b-form>

            <div v-else>
                <h3 class="text-center">Thanks for Reaching Out!</h3>
                <p class="text-muted">We'll respond to your message as soon as possible.</p>
            </div>
        </div>
    </card-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardContainer from '@/core/components/cards/card-container.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import { EventBus } from '../../core/event/event-bus';
import { ContactMixin } from '@/support/mixins/contact-mixin';
import { ContactMessage } from '../entities/contact-message';
import AlertMessage from '@/core/components/alert-message.vue';

@Component({
    name: 'contact-form',
    components: {
        CardContainer,
        MaterialIcon,
        AlertMessage,
    },
})
export default class ContactForm extends ContactMixin {
    /**
     * The email to respond back to.
     */
    public email: string = '';

    /**
     * The subject line of the contact message.
     */
    public subject: string = '';

    /**
     * The body of the message.
     */
    public body: string = '';

    /**
     * If the form is currently awaiting a message being sent to the backend.
     */
    public isLoading: boolean = false;

    /**
     * The error message.
     */
    public message: string = '';

    /**
     * If the user has submitted their contact message or not.
     */
    public submitted = false;

    public created() {
        // Custom error messages.
        this.$validator.localize('en', {
            custom: {
                contactEmail: {
                    email: 'Email must be a valid email address.',
                    required: 'Email address is required.',
                    max: 'Email must be 64 characters or less.',
                },
                contactSubject: {
                    max: 'Subject must be 128 characters or less.',
                },
                contactBody: {
                    required: 'Message is required.',
                    max: 'Message must be 2048 characters or less.',
                },
            },
        });
    }

    /**
     * Send the request off the to the backend.
     */
    public async onSendButtonClicked() {
        EventBus.emit('loading');
        this.isLoading = true;

        try {
            await this.$contactStore.sendContactMessage(
                new ContactMessage({
                    subject: this.subject,
                    email: this.email,
                    body: this.body,
                })
            );
        } catch (error) {
            this.message = error;
        }

        this.isLoading = false;
        EventBus.emit('loaded');
        this.submitted = true;
    }
}
</script>