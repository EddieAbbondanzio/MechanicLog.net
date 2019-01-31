<style lang="scss">
nav {
    height: 100vh;
    width: 256px;
    position: relative;
    float: left;
}

.user {
    bottom: 24px;
    position: absolute;
}
</style>

<template>
    <nav class="bg-primary">
        <side-bar-icon class="pb-5 pt-4"/>
        <side-bar-button name="Dashboard" icon="dashboard" route="dashboard"/>
        <side-bar-button name="Garage" icon="time_to_leave" route="garage"/>

        <side-bar-user class="user"/>
    </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SideBarButton from '@/core/components/private/side-bar/side-bar-button.vue';
import SideBarUser from '@/core/components/private/side-bar/side-bar-user.vue';
import SideBarIcon from '@/core/components/private/side-bar/side-bar-icon.vue';

/**
 * Side bar used on the dashboard pages.
 */
@Component({
    name: 'side-bar',
    components: {
        SideBarButton,
        SideBarIcon,
        SideBarUser,
    },
})
export default class SideBar extends Vue {
}
</script>