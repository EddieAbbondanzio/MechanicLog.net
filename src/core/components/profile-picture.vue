<style lang="scss" scoped>
.profile-picture-sm {
    height: 64px;
    width: 64px;
}

.profile-picture-md {
    height: 96px;
    width: 96px;
}

.profile-picture-lg {
    height: 128px;
    width: 128px;
}

.profile-picture-xl {
    height: 256px;
    width: 256px;
}

.profile-picture-container {
    height: 100%;
    overflow: hidden;
}
</style>

<template>
    <div :class="cssClass()">
        <material-icon
            icon="directions_car"
            color="secondary"
            size="xl"
            v-if="image == null && icon != null"
        />

        <div
            class="profile-picture-container rounded-circle d-flex flex-row align-items-center justify-content-center"
            v-if="image != null"
        >
            <img class="h-100" :src="image.data">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Picture } from '../common/picture';
import { Nullable } from '../common/monads/nullable';

/**
 * The size of the profile picture on the screen.
 */
export type ProfilePictureSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * A super trendy and round profile picture.
 */
@Component({
    name: 'profile-picture',
    components: {
        MaterialIcon,
    },
})
export default class ProfilePicture extends Vue {
    /**
     * The size of the profile picture on the screen.
     */
    @Prop({ default: 'lg' })
    public size!: ProfilePictureSize;

    /**
     * The picture to display.
     */
    @Prop()
    public image!: Nullable<Picture>;

    /**
     * The material icon to show if the profile picture is empty.
     */
    @Prop({ default: null })
    public icon!: Nullable<string>;

    /**
     * Get the css class for the size of the profile picture.
     */
    public cssClass(): string {
        return `profile-picture-${this.size} rounded-circle border d-flex align-items-center justify-content-center bg-white`;
    }
}
</script>