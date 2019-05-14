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
                        ref="profilePictureUploader"
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
import { FileUtils } from '@/core/common/utils/file-utils';
import { VehicleProfilePicture } from '../vehicle/entities/vehicle-profile-picture';

@Component({
    name: 'vehicle-information',
    components: {
        CardContainer,
    },
})
export default class VehicleSettings extends VehicleMixin {
    public $refs!: {
        profilePictureUploader: HTMLInputElement;
    };

    @Prop()
    public vehicle!: Vehicle;

    /**
     * The profile picture of the vehicle.
     */
    public profilePicture: Nullable<VehicleProfilePicture> = null;

    public async created() {
        this.$validator.localize('en', {
            custom: {
                vehicleProfilePicture: {
                    image: 'Vehicle profile picture must be an image.',
                    size: 'Vehicle profile picture must be 1MB or less.',
                },
            },
        });

        this.profilePicture = await this.$vehicleProfilePictureStore.getVehicleProfilePicture(this.vehicle);
    }

    /**
     * Do something fancy when the profile picture is uploaded.
     */
    public async onProfilePictureUploaded(event: any): Promise<void> {
        // If the file is bad, reject it!
        if (!(await this.$validator.validate('vehicleProfilePicture'))) {
            this.$refs.profilePictureUploader.value = '';
            return;
        }

        const file: File = event.target.files[0];

        let fileType = file.type.substr(-3);

        // Gross catch to convert jpeg to jpg for now...
        if (fileType === 'peg') {
            fileType = 'jpg';
        }

        const fileData = await FileUtils.toBase64(file);

        const profilePicture: VehicleProfilePicture = new VehicleProfilePicture(this.vehicle.id, fileData, file.name, fileType);
        await this.$vehicleProfilePictureStore.uploadVehicleProfilePicture(this.vehicle, profilePicture);

        this.$forceUpdate();
    }
}
</script>