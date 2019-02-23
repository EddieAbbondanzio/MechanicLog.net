<template>
    <div style="height: 40px;">
        <!-- Button on screen -->
        <b-btn variant="success" v-b-modal.addMechanicModal style="height: 40px">
            <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
            <span style="vertical-align: middle;">Add Maintenance</span>
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
                <!-- Mileage Textbox -->
                <div class="form-group">
                    <label for="zip-textbox" class="required">Mileage</label>
                    <input
                        type="text"
                        class="form-control"
                        id="zip-textbox"
                        placeholder="123000"
                        ref="mileageField"
                        name="mileage"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('mileage') }}</b-form-invalid-feedback>
                </div>

                <!-- Date -->
                <div class="form-group">
                    <label for="zip-textbox" class="required">Date</label>
                    <input
                        type="date"
                        class="form-control"
                        id="zip-textbox"
                        placeholder="123000"
                        ref="mileageField"
                        name="mileage"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('mileage') }}</b-form-invalid-feedback>
                </div>

                <!-- Mechanic -->
                <div class="form-group">
                    <label for="zip-textbox" class="required">Mechanic</label>
                    <input
                        type="text"
                        class="form-control"
                        id="zip-textbox"
                        placeholder="123000"
                        ref="mileageField"
                        name="mileage"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('mileage') }}</b-form-invalid-feedback>
                </div>

                <!-- Cost -->
                <div class="form-group">
                    <label for="zip-textbox" class="required">Cost</label>
                    <input
                        type="text"
                        class="form-control"
                        id="zip-textbox"
                        placeholder="123000"
                        ref="mileageField"
                        name="mileage"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('mileage') }}</b-form-invalid-feedback>
                </div>

                <!-- Services -->
                <div class="form-group">
                    <label for="zip-textbox" class="required">Services</label>
                    <input
                        type="text"
                        class="form-control"
                        id="zip-textbox"
                        placeholder="123000"
                        ref="mileageField"
                        name="mileage"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('mileage') }}</b-form-invalid-feedback>
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
 * Popup form to add a new maintenance even.
 */
@Component({
    name: 'add-maintenance-popup',
    components: {
        MaterialIcon,
    },
})
export default class AddMaintenancePopup extends Vue {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
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

        // await this.$addMechanic(mechanic);
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
        this.$validator.reset();
    }

    /**
     * Once the popup is visible, activate the first field.
     */
    public async onShown(): Promise<void> {
        alert('hi');
    }
}
</script>