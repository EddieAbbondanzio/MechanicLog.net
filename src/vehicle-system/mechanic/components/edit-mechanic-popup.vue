<template>
    <b-modal title="Edit Mechanic" ref="popup">
        <!-- Form -->
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
                <label for="city-textbox">City</label>
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

        <!-- Footer -->
        <div slot="modal-footer">
            <b-btn variant="muted" class="mr-2" @click="_onCancel">Cancel</b-btn>
            <b-btn variant="success" class="ml-2" @click="_onConfirm">Confirm</b-btn>
        </div>
    </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Modal } from 'bootstrap-vue';
import { Popup } from '@/core/components/interfaces/popup';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';

/**
 * Popup to edit an existing mechanic.
 */
@Component({
    name: 'edit-mechanic-popup',
})
export default class EditMechanicPopup extends Vue implements Popup {
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
        popup: Modal;
    };

    /**
     * The mechanic to edit.
     */
    @Prop()
    public mechanic!: Mechanic;

    /**
     * Show the popup to the user.
     */
    public show(): void {
        this.$refs.popup.show();

        // Need to populate the fields
        this.$refs.nameField.value = this.mechanic.name || '';
        this.$refs.phoneField.value = this.mechanic.phone || '';
        this.$refs.addressField.value = this.mechanic.address || '';
        this.$refs.cityField.value = this.mechanic.city || '';
        this.$refs.stateField.value = this.mechanic.state || '';
        this.$refs.zipField.value = this.mechanic.zip || '';
    }

    /**
     * Hide the popup from the user.
     */
    public hide(): void {
        this.$refs.popup.hide();
    }

    protected async _onConfirm(): Promise<void> {
        // Validate it, before we send it off to the back end.
        if (!(await this.$validator.validate())) {
            return;
        }

        const rawPhone: string = this.$refs.phoneField.value;
        const rawAddress: string = this.$refs.addressField.value;
        const rawCity: string = this.$refs.cityField.value;
        const rawState: string = this.$refs.stateField.value;
        const rawZip: string = this.$refs.zipField.value;

        const mechanic: Mechanic = new Mechanic(this.$refs.nameField.value);
        mechanic.id = this.mechanic.id;
        mechanic.phone = rawPhone === '' ? null : rawPhone;
        mechanic.address = rawAddress === '' ? null : rawAddress;
        mechanic.city = rawCity === '' ? null : rawCity;
        mechanic.state = rawState === '' ? null : rawState;
        mechanic.zip = rawZip === '' ? null : rawZip;

        this.$emit('edit', mechanic);
        this.hide();
    }

    protected async _onCancel(): Promise<void> {
        this.hide();
    }
}
</script>
