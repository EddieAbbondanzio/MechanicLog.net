<style lang="scss" scoped>
</style>

<template>
    <div>
        <card-container>
            <div class="clearfix border-bottom pb-3 mb-3">
                <h2 class="float-left mb-0">Settings</h2>
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

                <b-form-group v-if="profilePicture != null">
                    <div class="d-flex flex-row">
                        <div>hi</div>

                        <!-- File Name -->
                        <div class="d-flex flex-column justify-content-center">
                            <h5>{{ profilePicture.fileName }}</h5>
                        </div>

                        <!-- Buttons -->
                        <div class="pl-3 d-flex flex-column">
                            <a href="#" class="text-primary">Upload Photo</a>
                            <a href="#" class="text-danger" @click="onDeleteClick">Delete</a>
                        </div>
                    </div>
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
        EventBus.emit('loading');
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

        EventBus.emit('vehicleProfilePictureUploaded', this.vehicle);
        EventBus.emit('loaded');

        // Update the screen and let the user delete the profile picture if they want.
        this.profilePicture = profilePicture;
    }

    public async onDeleteClick() {
        EventBus.emit('loading');
        await this.$vehicleProfilePictureStore.deleteVehicleProfilePicture(this.vehicle);
        this.profilePicture = null;
        EventBus.emit('vehicleProfilePictureDeleted', this.vehicle);
        EventBus.emit('loaded');
    }
}
</script>