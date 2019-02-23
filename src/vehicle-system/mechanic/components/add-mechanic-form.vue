<template>
    <div style="height: 40px;">
        <!-- Button on screen -->
        <b-btn variant="success" v-b-modal.addMechanicModal style="height: 40px">
            <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
            <span style="vertical-align: middle;">Add Mechanic</span>
        </b-btn>

        <!-- Popup -->
        <b-modal
            id="addMechanicModal"
            title="Add New Mechanic"
            ref="popup"
            @show="onShow"
            @shown="onShown"
        >
            <form>
                <!-- Name Textbox -->
                <div class="form-group">
                    <label class="required" for="name-textbox">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="name-textbox"
                        placeholder="Mike's Mechanic Shop"
                        ref="nameField"
                        name="name"
                        v-validate="'required|max:32'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('name') }}</b-form-invalid-feedback>
                </div>

                <!-- Phone Textbox -->
                <div class="form-group">
                    <label for="phone-textbox">Phone</label>
                    <input
                        type="text"
                        class="form-control"
                        id="phone-textbox"
                        placeholder="555-123-1234"
                        ref="phoneField"
                        name="phone"
                        v-validate="'max:16|phone-number'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('phone') }}</b-form-invalid-feedback>
                </div>

                <!-- Address Textbox -->
                <div class="form-group">
                    <label for="address-textbox">Address</label>
                    <input
                        type="text"
                        class="form-control"
                        id="address-textbox"
                        placeholder="123 Wallaby Lane"
                        ref="addressField"
                        name="address"
                        v-validate="'max:32'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('address') }}</b-form-invalid-feedback>
                </div>

                <!-- City Textbox -->
                <div class="form-group">
                    <label for="city-textbox">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="city-textbox"
                        placeholder="Boston"
                        ref="cityField"
                        name="city"
                        v-validate="'max:32'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('city') }}</b-form-invalid-feedback>
                </div>

                <!-- State Textbox -->
                <div class="form-group">
                    <label for="state-textbox">State</label>
                    <input
                        type="text"
                        class="form-control"
                        id="state-textbox"
                        placeholder="MA"
                        ref="stateField"
                        name="state"
                        v-validate="'length:2'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('state') }}</b-form-invalid-feedback>
                </div>

                <!-- Zip Textbox -->
                <div class="form-group">
                    <label for="zip-textbox">Zip Code</label>
                    <input
                        type="text"
                        class="form-control"
                        id="zip-textbox"
                        placeholder="12345"
                        ref="zipField"
                        name="zip"
                        v-validate="'max:10|zip-code'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('zip') }}</b-form-invalid-feedback>
                </div>
            </form>

            <div slot="modal-footer">
                <b-btn @click="onCancelButtonClick" class="mr-1">Cancel</b-btn>

                <b-btn
                    @click="onAddButtonClick"
                    variant="success"
                    class="ml-1"
                    :disabled="this.errors.all().length > 0"
                    :title="this.errors.all().length > 0 ? 'Please fix any errors first.' : 'Add a new vehicle.'"
                >
                    <material-icon icon="add" size="md"/>Add
                </b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MechanicMixin } from '@/vehicle-system/mechanic/mixins/mechanic-mixin';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';

/**
 * Popup form to add a new mechanic.
 */
@Component({
    name: 'new-component',
    components: {
        MaterialIcon,
    },
})
export default class AddMechanicForm extends MechanicMixin {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        nameField: HTMLInputElement;
        phoneField: HTMLInputElement;
        addressField: HTMLInputElement;
        cityField: HTMLInputElement;
        stateField: HTMLInputElement;
        zipField: HTMLInputElement;
        popup: any;
    };

    /**
     * User wants to submit, and create the new mechanic.
     */
    public async onAddButtonClick(): Promise<void> {
        // Validate it, before we send it off to the back end.
        if (!(await this.$validator.validate())) {
            return;
        }

        const name: string = this.$refs.nameField.value;
        const phone: string = this.$refs.phoneField.value;
        const address: string = this.$refs.addressField.value;
        const city: string = this.$refs.cityField.value;
        const state: string = this.$refs.stateField.value;
        const zip: string = this.$refs.zipField.value;

        const mechanic: Mechanic = new Mechanic(name);
        mechanic.phone = phone;
        mechanic.address = address;
        mechanic.city = city;
        mechanic.state = state;
        mechanic.zip = zip;

        await this.$addMechanic(mechanic);
        this.$refs.popup.hide();

    }

    public async onCancelButtonClick(): Promise<void> {
        this.$refs.popup.hide();
    }

    /**
     * When the popup is being prepared to be shown, reset everything back to it's
     * original empty state.
     */
    public async onShow(): Promise<void> {
        this.$refs.nameField.value = '';

        this.$validator.reset();
    }

    /**
     * Once the popup is visible, activate the first field.
     */
    public async onShown(): Promise<void> {
        this.$refs.nameField.focus();
    }
}
</script>