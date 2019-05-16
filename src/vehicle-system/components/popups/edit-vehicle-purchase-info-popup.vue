<template>
    <popup-container
        id="addVehicle"
        ref="popup"
        title="Edit Vehicle Purchase Info"
        size="lg"
        headerColor="primary"
    >
        <form>
            <!-- Date Textbox-->
            <div class="form-group">
                <label class="required" for="date-textbox">Purchase Date</label>
                <input
                    type="date"
                    class="form-control"
                    id="date-textbox"
                    placeholder="03/03/2019"
                    v-model="date"
                    name="date"
                    v-validate="'required'"
                >
                <b-form-invalid-feedback>{{ errors.first('date') }}</b-form-invalid-feedback>
            </div>

            <!-- Mileage Textbox-->
            <div class="form-group">
                <label class="required" for="mileage-textbox">Mileage</label>
                <input
                    type="text"
                    class="form-control"
                    id="mileage-textbox"
                    placeholder="49120"
                    v-model.number="mileage"
                    name="mileage"
                    v-validate="'required|min_value:0'"
                >
                <b-form-invalid-feedback>{{ errors.first('mileage') }}</b-form-invalid-feedback>
            </div>

            <!-- Price Textbox-->
            <div class="form-group">
                <label class="required" for="price-textbox">Price</label>
                <input
                    type="text"
                    class="form-control"
                    id="price-textbox"
                    placeholder="2499"
                    v-model.number="price"
                    name="price"
                    v-validate="'required|min_value:0'"
                >
                <b-form-invalid-feedback>{{ errors.first('price') }}</b-form-invalid-feedback>
            </div>

            <!-- Seller Name Textbox-->
            <div class="form-group">
                <label for="vin-textbox">Seller's name</label>
                <input
                    type="text"
                    class="form-control"
                    id="seller-name-textbox"
                    placeholder="Micheal Scott"
                    v-model="sellerName"
                    name="sellerName"
                    v-validate="'max:32'"
                >
                <b-form-invalid-feedback>{{ errors.first('sellerName') }}</b-form-invalid-feedback>
            </div>
        </form>

        <div slot="footer">
            <b-button variant="warning" class="float-left" @click="onCancelClick">Cancel</b-button>

            <!-- Create Button -->
            <b-button variant="primary" class="float-right" @click="onConfirmClick">Confirm</b-button>
        </div>
    </popup-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VehicleMixin } from '@/vehicle-system/mixins/vehicle-mixin';
import { Modal } from 'bootstrap-vue';
import { Vehicle } from '@/vehicle-system/entities/vehicle/vehicle';
import { Nullable } from '@/core/common/monads/nullable';
import PopupContainer from '@/core/components/popup/popup-container.vue';
import { VehiclePurchaseInfo } from '@/vehicle-system/entities/vehicle/vehicle-purchase-info';

/**
 * Popup to edit the purchase details of a vehicle.
 */
@Component({
    components: {
        PopupContainer,
    },
})
export default class EditVehiclePurchaseInfoPopup extends Vue {
    /**
     * Type declarations for the $refs of the component.
     */
    public $refs!: {
        popup: PopupContainer;
    };

    /**
     * The vehicle to edit.
     */
    @Prop()
    public purchaseInfo!: VehiclePurchaseInfo;

    /**
     * The date it was sold on.
     */
    public date: Nullable<string> = null;

    /**
     * The mileage when it was sold.
     */
    public mileage: Nullable<number> = null;

    /**
     * The price it sold for.
     */
    public price: Nullable<number> = null;

    /**
     * The name of who sold the vehicle.
     */
    public sellerName: Nullable<string> = null;

    public created(): void {
        this.$validator.localize('en', {
            custom: {
                date: {
                    required: 'Purchase date is required.',
                    date_format: 'Purchase date must be in format MM/DD/YYYY',
                },
                mileage: {
                    required: 'Purchase mileage is required.',
                    min_value: 'Purchase mileage must be greater than 0.',
                },
                price: {
                    required: 'Purchase price is required.',
                    min_value: 'Purchase price must be greater than 0.',
                },
                sellerName: {
                    max: 'Seller name must be 32 characters or less.',
                },
            },
        });
    }

    /**
     * Show the popup on the screen.
     */
    public show(): void {
        if (this.purchaseInfo.purchaseDate != null) {
            this.date = this.purchaseInfo.purchaseDate.toISOString().slice(0, 10);
        }

        this.mileage = this.purchaseInfo.purchaseOdometer;
        this.price = this.purchaseInfo.purchasePrice;
        this.sellerName = this.purchaseInfo.sellerName;

        this.$validator.reset();
        this.$refs.popup.show();
    }

    /**
     * Hide the popup from the screen.
     */
    public hide(): void {
        this.$refs.popup.hide();
    }

    /**
     * On cancel click. Hide the popup.
     */
    protected async onCancelClick(): Promise<void> {
        this.hide();
    }

    /**
     * On confirm click. Apply the changes.
     */
    protected async onConfirmClick(): Promise<void> {
        // Validate it, before we send it off to the back end.
        if (!(await this.$validator.validate())) {
            return;
        }

        const purchaseInfo = new VehiclePurchaseInfo(
            this.purchaseInfo.vehicleId,
            this.purchaseInfo.purchaseDate,
            this.purchaseInfo.purchaseOdometer,
            this.purchaseInfo.purchasePrice,
            this.purchaseInfo.sellerName
        );

        purchaseInfo.id = this.purchaseInfo.id;

        if (this.date != null) {
            purchaseInfo.purchaseDate = new Date(this.date);
        }

        if (this.mileage != null) {
            purchaseInfo.purchaseOdometer = this.mileage;
        }

        if (this.price != null) {
            purchaseInfo.purchasePrice = this.price;
        }

        if (this.sellerName != null) {
            purchaseInfo.sellerName = this.sellerName;
        }

        this.$emit('edit', purchaseInfo);
        this.$refs.popup.hide();
    }
}
</script>