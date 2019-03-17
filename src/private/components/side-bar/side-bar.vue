<style lang="scss" scoped>
.side-bar {
    width: 256px;
}

.side-bar-section-header {
    font-size: 1.5em !important;
}
</style>

<template>
    <nav class="side-bar bg-light border-right py-4 align-bottom px-2">
        <div>
            <!-- Garage Section Header -->
            <div class="side-bar-section-header pb-1 mb-2 d-flex flex-row">
                <material-icon
                    icon="time_to_leave"
                    size="md"
                    color="dark"
                    class="pr-2 align-self-center"
                />Garage
            </div>

            <side-bar-button name="Vehicles" route="vehicles"/>
            <side-bar-button name="Mechanics" route="mechanics"/>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SideBarButton from './side-bar-button.vue';
import MaterialIcon from '@/core/components/material-icon.vue';

/**
 * Side bar used on the dashboard pages.
 */
@Component({
    name: 'side-bar',
    components: {
        SideBarButton,
        MaterialIcon,
    },
})
export default class SideBar extends Vue {}
</script>