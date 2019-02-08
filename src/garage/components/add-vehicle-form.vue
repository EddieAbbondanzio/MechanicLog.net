<template>
    <div>
        <!-- Button on screen -->
        <modal-trigger-button color="success" target="add-vehicle-modal">
            <material-icon icon="add" size="md"/>Add Vehicle
        </modal-trigger-button>

        <!-- Da popup -->
        <modal-popup id="add-vehicle-modal" title="Add New Vehicle">
            <form>
                <!-- Model Year Textbox -->
                <div class="form-group">
                    <label class="required" for="year-textbox">Year</label>
                    <input
                        type="text"
                        class="form-control"
                        id="year-textbox"
                        placeholder="2005"
                        name="year"
                        v-validate="'required|integer|min_value:1900|max_value:' + maxModelYear"
                        data-vv-validate-on="blur"
                    >
                </div>

                <!-- Make Textbox -->
                <div class="form-group">
                    <label class="required" for="make-textbox">Make</label>
                    <input
                        type="text"
                        class="form-control"
                        id="make-textbox"
                        placeholder="Honda"
                        name="make"
                        v-validate="'required|max:32'"
                        data-vv-validate-on="blur"
                    >
                </div>

                <!-- Model Textbox -->
                <div class="form-group">
                    <label class="required" for="model-textbox">Model</label>
                    <input
                        type="text"
                        class="form-control"
                        id="model-textbox"
                        placeholder="Civic"
                        name="model"
                        v-validate="'required|max:32'"
                        data-vv-validate-on="blur"
                    >
                </div>

                <!-- Mileage Textbox-->
                <div class="form-group">
                    <label class="required" for="mileage-textbox">Mileage</label>
                    <input
                        type="text"
                        class="form-control"
                        id="mileage-textbox"
                        placeholder="123000"
                        name="mileage"
                        v-validate="'required|integer|min_value:0'"
                        data-vv-validate-on="blur"
                    >
                </div>

                <!-- Color Textbox-->
                <div class="form-group">
                    <label for="color-textbox">Color</label>
                    <input
                        type="text"
                        class="form-control"
                        id="color-textbox"
                        placeholder="Red"
                        name="color"
                        v-validate="'max:16'"
                        data-vv-validate-on="blur"
                    >
                </div>

                <!-- License Plate Textbox-->
                <div class="form-group">
                    <label for="license-plate-textbox">License Plate</label>
                    <input
                        type="text"
                        class="form-control"
                        id="license-plate-textbox"
                        placeholder="3232 XJ"
                        name="licensePlate"
                        v-validate="'max:10'"
                        data-vv-validate-on="blur"
                    >
                </div>

                <!-- Vin Textbox-->
                <div class="form-group">
                    <label for="vin-textbox">VIN</label>
                    <input
                        type="text"
                        class="form-control"
                        id="vin-textbox"
                        placeholder="1FTFW1EF1BFC16841"
                        name="vin"
                        v-validate="'max:17'"
                        data-vv-validate-on="blur"
                    >
                </div>

                <!-- NickName Textbox -->
                <div class="form-group">
                    <label for="name-textbox">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="name-textbox"
                        placeholder="Daily Driver"
                        name="nickName"
                        v-validate="'max:32'"
                        data-vv-validate-on="blur"
                    >
                    <small>A nickname can be used to help identify vehicles easier.</small>
                </div>

                <div class="mx-auto d-table">
                    <form-error-list class="d-table-cell" :form="this"/>
                </div>
            </form>

            <div slot="footer">
                <button type="button" @click="onAddButtonClick">Click Me</button>

                <modal-exit-button class="mr-2" color="primary">
                    <material-icon>add</material-icon>Add
                </modal-exit-button>

                <modal-exit-button class="ml-2" color="warning">Cancel</modal-exit-button>
            </div>
        </modal-popup>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ModalTriggerButton from '@/core/components/shared/modal/modal-trigger-button.vue';
import ModalExitButton from '@/core/components/shared/modal/modal-exit-button.vue';
import ModalPopup from '@/core/components/shared/modal/modal-popup.vue';
import MaterialIcon from '@/core/components/shared/material-icon.vue';
import FormErrorList from '@/core/components/shared/form/form-error-list.vue';

/**
 * Popup to add a new vehicle.
 */
@Component({
    name: 'add-vehicle-form',
    components: {
        ModalTriggerButton,
        ModalExitButton,
        ModalPopup,
        MaterialIcon,
        FormErrorList,
    },
})
export default class AddVehicleForm extends Vue {
    /**
     * The next year from the current one.
     */
    public get maxModelYear(): number {
        return new Date().getFullYear() + 1;
    }

    public async onAddButtonClick(): Promise<void> {
        alert('fuck');
    }
}
</script>
