<template>
    <popup-container
        id="editMechanic"
        ref="popup"
        title="Edit Mechanic"
        size="lg"
        headerColor="primary"
    >
        <form v-if="mechanic != null">
            <b-card no-body border-variant="white">
                <b-tabs v-model="activeStep">
                    <b-tab title="Contact Info" class="py-4" @click="onTabClick">
                        <!-- Name Textbox -->
                        <div class="form-group">
                            <label class="required" for="name-textbox">Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="name-textbox"
                                placeholder="Mike's Mechanic Shop"
                                ref="nameTextbox"
                                v-model="mechanic.name"
                                name="editMechanicName"
                                v-validate="'required|max:32'"
                            >
                            <b-form-invalid-feedback>{{ errors.first('editMechanicName') }}</b-form-invalid-feedback>
                        </div>

                        <div class="form-group">
                            <label class="required" for="edit-type-dropdown">Type</label>
                            <b-form-select
                                id="edit-type-dropdown"
                                v-model="mechanic.type"
                                :options="typeOptions"
                                ref="editMechanicType"
                                name="editMechanicType"
                                v-validate="'required'"
                            />
                        </div>

                        <!-- Phone Textbox -->
                        <div class="form-group">
                            <label for="phone-textbox">Phone</label>
                            <input
                                type="text"
                                class="form-control"
                                id="phone-textbox"
                                placeholder="555-123-1234"
                                ref="phoneTextbox"
                                v-model="mechanic.phone"
                                name="editMechanicPhone"
                                v-validate="'max:16|phone-number'"
                            >
                            <b-form-invalid-feedback>{{ errors.first('editMechanicPhone') }}</b-form-invalid-feedback>
                        </div>
                    </b-tab>

                    <b-tab
                        no-body
                        title="Location"
                        v-model="activeStep"
                        class="py-4"
                        @click="onTabClick"
                    >
                        <!-- Address Textbox -->
                        <div class="form-group">
                            <label for="address-textbox">Address</label>
                            <input
                                type="text"
                                class="form-control"
                                id="address-textbox"
                                placeholder="123 Wallaby Lane"
                                ref="addressField"
                                v-model="mechanic.address"
                                name="editMechanicAddress"
                                v-validate="'max:32'"
                            >
                            <b-form-invalid-feedback>{{ errors.first('mechanicAddress') }}</b-form-invalid-feedback>
                        </div>

                        <!-- City Textbox -->
                        <div class="form-group">
                            <label for="city-textbox">City</label>
                            <input
                                type="text"
                                class="form-control"
                                id="city-textbox"
                                placeholder="Boston"
                                ref="cityTextbox"
                                v-model="mechanic.city"
                                name="editMechanicCity"
                                v-validate="'max:32'"
                            >
                            <b-form-invalid-feedback>{{ errors.first('mechanicCity') }}</b-form-invalid-feedback>
                        </div>

                        <!-- State Textbox -->
                        <div class="form-group">
                            <label for="state-textbox">State</label>
                            <input
                                type="text"
                                class="form-control"
                                id="state-textbox"
                                placeholder="MA"
                                ref="stateTextbox"
                                v-model="mechanic.state"
                                name="editMechanicState"
                                v-validate="'length:2'"
                            >
                            <b-form-invalid-feedback>{{ errors.first('mechanicState') }}</b-form-invalid-feedback>
                        </div>

                        <!-- Zip Textbox -->
                        <div class="form-group">
                            <label for="zip-textbox">Zip Code</label>
                            <input
                                type="text"
                                class="form-control"
                                id="zip-textbox"
                                placeholder="12345"
                                ref="zipTextbox"
                                v-model="mechanic.zip"
                                name="editMechanicZip"
                                v-validate="'max:10|zip-code'"
                            >
                            <b-form-invalid-feedback>{{ errors.first('mechanicZip') }}</b-form-invalid-feedback>
                        </div>
                    </b-tab>
                </b-tabs>
            </b-card>
        </form>

        <hr>

        <!-- Progress Tracker to keep the user updated on where their at. -->
        <progress-tracker :current="activeStep + 1" :max="2"/>

        <!-- Previous Button -->
        <div slot="footer">
            <b-button
                variant="success"
                class="float-left"
                @click="onPreviousClick"
                v-if="activeStep == 1"
            >Previous</b-button>

            <!-- Next Button -->
            <b-button
                variant="success"
                class="float-right"
                @click="onNextClick"
                v-if="activeStep == 0"
            >Next</b-button>

            <!-- Create Button -->
            <b-button
                variant="primary"
                class="float-right"
                @click="onCreateClick($event)"
                v-else
            >Create</b-button>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import ProgressTracker from '@/core/components/ux/progress-tracker.vue';
import { Mechanic } from '@/vehicle-system/entities/mechanic';
import { MechanicType } from '@/vehicle-system/common/mechanic-type';

/**
 * Popup to create a new mechanic for the user.
 */
@Component({
    name: 'edit-mechanic-popup',
    components: {
        PopupContainer,
        MaterialIcon,
        ProgressTracker,
    },
})
export default class EditMechanicPopup extends Vue {
    public $refs!: {
        popup: PopupContainer;
        nameTextbox: HTMLInputElement;
        phoneTextbox: HTMLInputElement;
    };

    /**
     * The mechanic being editted.
     */
    public mechanic: Mechanic = new Mechanic('null', 0);

    /**
     * Type options for the mechanic type select field.
     */
    public typeOptions: { value: number; text: string }[] = [
        { value: 0, text: 'Mechanic' },
        { value: 1, text: 'Dealership' },
        { value: 2, text: 'Shop' },
        { value: 3, text: 'Self' },
        { value: 4, text: 'Employee' },
        { value: 5, text: 'Friend' },
        { value: 6, text: 'Other' },
    ];

    /**
     * The number of the step the user is currently on.
     */
    public activeStep!: number;

    /**
     * Cached value of the previous step so we can validate
     * after a user has left a page.
     */
    public lastStep!: number;

    public created(): void {
        this.activeStep = 0;
        this.lastStep = 0;

        // prettier-ignore
        this.$validator.localize('en', {
            custom: {
                'editMechanicName': {
                    'required': 'Name of the mechanic or shop is required.',
                    'max': 'Name must be less than 32 characters.',
                },
                'editMechanicPhone': {
                    'phone-number': 'Phone number must be in the format ###-###-####.',
                    'max': 'Phone number must be less than 16 digits including hyphens.',
                },
                'editMechanicAddress': {
                    'max': 'Address must be less than 32 characters.',
                },
                'editMechanicCity': {
                    'max': 'City must be less than 32 characters.',
                },
                'editMechanicState': {
                    'max': 'State abbreviation must only be 2 characters.',
                },
                'editMechanicZip': {
                    'max': 'Zip code must be less than 10 characters.',
                    'zip-code': 'Zip code must be in format ##### or #####-####',
                },
            },
        });
    }

    public async onTabClick(): Promise<void> {
        if (!(await this.validateTab(this.lastStep))) {
            this.activeStep = this.lastStep;
            this.$forceUpdate();
        }

        // Gotta cache last tab somehow. $event is coming in undefined...
        this.lastStep = this.activeStep;
    }

    /**
     * User wants to go to the next page
     */
    public async onNextClick(): Promise<void> {
        if (this.activeStep === 0) {
            if (await this.validateTab(0)) {
                this.activeStep = 1;
            }

            this.$forceUpdate();
        }
    }

    /**
     * User wants to go back a page.
     */
    public async onPreviousClick(): Promise<void> {
        if (this.activeStep === 1) {
            this.activeStep = 0;
            this.$forceUpdate();
        }
    }

    /**
     * User wants to create the mechanic.
     */
    public async onCreateClick(): Promise<void> {
        const isValid: boolean = await this.$validator.validate();

        if (isValid) {
            this.$emit('edit', this.mechanic);
            this.hide();
        }

        this.$forceUpdate();
    }

    /**
     * Show the popup on screen.
     */
    public show(mechanic: Mechanic): void {
        this.mechanic = mechanic;
        this.activeStep = 0;
        this.lastStep = 0;
        this.$validator.reset();
        this.$refs.popup.show();
        this.$forceUpdate();
    }

    /**
     * Hide the popup from view.
     */
    public hide(): void {
        this.$refs.popup.hide();
    }

    /**
     * Validate the current step.
     */
    public async validateTab(index: number): Promise<boolean> {
        switch (index) {
            case 0:
                return (await Promise.all([this.$validator.validate('editMechanicName'), this.$validator.validate('editMechanicPhone')])).every((v) => v);

            case 1:
                return (await Promise.all([
                    this.$validator.validate('editMechanicAddress'),
                    this.$validator.validate('editMechanicCity'),
                    this.$validator.validate('editMechanicState'),
                    this.$validator.validate('editMechanicZip'),
                ])).every((v) => v);

            default:
                throw new Error(`Tab index ${index} is invalid.`);
        }
    }
}
</script>