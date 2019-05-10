<style lang="scss" scoped>
</style>

<template>
    <div>
        <card-container class="p-3">
            <div class="pb-3 clearfix">
                <h2 class="float-left">Settings</h2>
            </div>

            <b-form>
                <b-form-group label="Vehicle Profile Picture">
                    <input
                        type="file"
                        class="form-control-file"
                        name="vehicleProfilePicture"
                        v-validate.reject="'image|size:1000'"
                        @input="onProfilePictureUploaded"
                    >
                    <b-form-invalid-feedback
                        class="d-block"
                    >{{ errors.first('vehicleProfilePicture') }}</b-form-invalid-feedback>
                </b-form-group>
            </b-form>
        </card-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardContainer from '@/core/components/cards/card-container.vue';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import { VehiclePurchaseInfo } from '@/vehicle-system/vehicle/entities/vehicle-purchase-info';
import { VehicleMixin } from '../vehicle/vehicle-mixin';
import { EventBus } from '@/core/event/event-bus';
import { Nullable } from '@/core/common/monads/nullable';

@Component({
    name: 'vehicle-information',
    components: {
        CardContainer,
    },
})
export default class VehicleSettings extends VehicleMixin {
    @Prop()
    public vehicle!: Vehicle;

    /**
     * The uploaded profile picture.
     */
    public profilePicture: Nullable<File> = null;

    public created() {
        this.$validator.localize('en', {
            custom: {
                vehicleProfilePicture: {
                    image: 'Vehicle profile picture must be an image.',
                    size: 'Vehicle profile picture must be 1MB or less.',
                },
            },
        });
    }

    /**
     * Do something fancy when the profile picture is uploaded.
     */
    public async onProfilePictureUploaded(): Promise<void> {
        // If the file is bad, reject it!
        // if (!(await this.$validator.validate('vehicleProfilePicture'))) {
        //     this.profilePicture = null;
        // }
    }
}
</script>