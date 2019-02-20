<style lang="scss">
nav {
    height: calc(100vh - 64px);
    width: 256px;
    position: relative;
    float: left;
}
</style>

<template>
    <nav class="bg-light border-right py-4">
        <side-bar-button name="Dashboard" route="dashboard" icon="dashboard"/>
        <side-bar-button name="Garage" route="garage" icon="time_to_leave" />
    </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SideBarButton from '@/core/components/private/side-bar/side-bar-button.vue';

/**
 * Side bar used on the dashboard pages.
 */
@Component({
    name: 'side-bar',
    components: {
        SideBarButton,
    },
})
export default class SideBar extends Vue {
}
</script>