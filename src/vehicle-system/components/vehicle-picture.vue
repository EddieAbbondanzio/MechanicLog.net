<style lang="scss" scoped>
.vehicle-profile-picture-container {
    overflow: hidden;
    height: 120px;
    width: 120px;

    img {
        height: 100%;
    }
}
</style>

<template>
    <div
        class="rounded-circle border d-flex flex-row align-items-center justify-content-center bg-white"
        style="height: 120px; width: 120px;"
    >
        <material-icon
            icon="directions_car"
            color="secondary"
            size="xl"
            v-if="profilePicture == null"
        />
        <div
            class="rounded-circle vehicle-profile-picture-container d-flex flex-row align-items-center justify-content-center"
            v-else
        >
            <img :src="profilePicture.data">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';
import { VehicleProfilePicture } from '@/vehicle-system/entities/vehicle/vehicle-profile-picture';

@Component({
    name: 'vehicle-picture',
    components: {
        MaterialIcon,
    },
})
export default class VehiclePicture extends Vue {
    /**
     * The profile picture to display.
     */
    @Prop()
    public profilePicture!: VehicleProfilePicture;
}
</script>