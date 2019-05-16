<template>
    <page-content>
        <error-popup ref="errorPopup"/>

        <div slot="tool-bar">
            <span class="text-muted">Feedback</span>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-12 mx-0 px-0">
                    <loading-bar v-if="isLoading"/>
                </div>
            </div>

            <div class="row py-3">
                <div class="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
                    <card-container>
                        <div v-if="status != 'sent'">
                            <h2 class="text-center">User Feedback</h2>

                            <!-- Form -->
                            <form>
                                <b-form-group>
                                    <label for="email-textbox">Email</label>
                                    <b-form-input
                                        v-model="email"
                                        :readonly="true"
                                        title="The email we will respond to"
                                    />
                                </b-form-group>

                                <!-- Type -->
                                <b-form-group>
                                    <label for="type-dropdown" class="required">Type</label>
                                    <b-form-select
                                        id="type-dropdown"
                                        v-model="type"
                                        name="feedbackType"
                                        v-validate="'required|min_value:0|max_value:5'"
                                    >
                                        <option :value="-1" disabled>Please select a feedback type</option>
                                        <option :value="0">Question</option>
                                        <option :value="1">Comment</option>
                                        <option :value="2">Request</option>
                                        <option :value="3">Bug</option>
                                        <option :value="4">Complaint</option>
                                    </b-form-select>

                                    <b-form-invalid-feedback
                                        class="d-block"
                                    >{{ errors.first('feedbackType') }}</b-form-invalid-feedback>
                                </b-form-group>

                                <!-- Message -->
                                <b-form-group>
                                    <label for="message-textarea" class="required">Message</label>
                                    <b-form-textarea
                                        id="message-textarea"
                                        placeholder="Enter feedback"
                                        rows="4"
                                        v-model="message"
                                        name="feedbackMessage"
                                        v-validate="'required|max:1024'"
                                    />

                                    <b-form-invalid-feedback
                                        class="d-block"
                                    >{{ errors.first('feedbackMessage') }}</b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group class="pt-3">
                                    <b-button
                                        variant="outline-secondary"
                                        @click="onResetClick"
                                    >Reset</b-button>

                                    <b-button
                                        variant="success"
                                        class="float-right"
                                        @click="onSubmitClick"
                                        :disabled="status == 'sending'"
                                    >{{ status == 'sending' ? 'Submitting' : 'Submit' }}</b-button>
                                </b-form-group>
                            </form>
                        </div>
                        <div v-else>
                            <!-- Header -->
                            <h2 class="text-center pb-5">
                                Thanks for using MechanicLog!
                                <br>
                                <small
                                    class="text-muted mt-2"
                                >All feedback will be responded via email as soon as possible.</small>
                            </h2>
                        </div>
                    </card-container>
                </div>
            </div>
        </div>
    </page-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardContainer from '@/core/components/cards/card-container.vue';
import { UserFeedbackType } from '@/user-system/entities/user-feedback-type';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import { UserFeedback } from '@/user-system/entities/user-feedback';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import LoadingBar from '@/core/components/ux/loading-bar.vue';
import PageContent from '@/core/components/layout/page-content.vue';
import { User } from '@/user-system/entities/user';

@Component({
    name: 'feedback',
    components: {
        CardContainer,
        ErrorPopup,
        LoadingBar,
        PageContent,
    },
})
export default class Feedback extends UserMixin {
    /**
     * Component references
     */
    public $refs!: {
        errorPopup: ErrorPopup;
    };

    /**
     * The email of the user
     */
    public email: string = '';

    /**
     * The type of error it is.
     */
    public type: UserFeedbackType = -1;

    /**
     * The message of the feedback
     */
    public message: string = '';

    public status: 'unsent' | 'sending' | 'sent' = 'unsent';

    public isLoading: boolean = false;

    /**
     * Prepare the component for use when generated.
     */
    public async created(): Promise<void> {
        this.email = User.CURRENT!.email;

        this.$validator.localize('en', {
            custom: {
                feedbackType: {
                    required: 'Feedback type is required.',
                    min_value: 'Feedback type is required.',
                },
                feedbackMessage: {
                    required: 'Feedback message is required.',
                    max: 'Feedback message must be 1024 characters or less.',
                },
            },
        });
    }

    /**
     * Event handler to reset the form back to defaults.
     */
    public async onResetClick(): Promise<void> {
        this.type = -1;
        this.message = '';
    }

    /**
     * Event handler for when the user clicks submit.
     */
    public async onSubmitClick(): Promise<void> {
        if (!(await this.$validator.validateAll())) {
            return;
        }

        this.status = 'sending';
        this.isLoading = true;
        const result = await this.$userStore.sendFeedback(new UserFeedback(this.type, this.message));

        this.status = 'sent';
        this.type = -1;
        this.message = '';

        this.isLoading = false;
    }
}
</script>
