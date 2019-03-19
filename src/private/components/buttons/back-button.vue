<style lang="scss" scoped>
@import './public/bootstrap/_functions';
@import './public/bootstrap/_variables';

.back-btn {
    text-decoration: none !important;

    &:hover {
        background-color: $gray-200 !important;
    }

    &:active {
        background-color: $gray-300 !important;
    }
}
</style>

<template>
    <router-link :to="href" class="btn back-btn rounded" style="height: 40px;">
        <material-icon icon="keyboard_backspace" color="muted" class="align-middle pr-1"/>
        <span class="text-muted align-middle">Back</span>
    </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';

@Component({
    name: 'back-button',
    components: {
        MaterialIcon,
    },
})
export default class BackButton extends Vue {
    /**
     * The path to navigate back to.
     */
    @Prop()
    public href!: {};
}
</script>