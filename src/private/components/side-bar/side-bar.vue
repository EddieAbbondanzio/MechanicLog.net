<style lang="scss">
.side-bar {
    height: calc(100vh - 64px);
    width: 256px;
    position: relative;
    top: 0px;
    display: inline-block;
    float: left;
}
</style>

<template>
    <nav class="side-bar bg-light border-right py-4 align-bottom">

        
        <!-- <side-bar-button name="Dashboard" route="dashboard" icon="dashboard"/> -->
        <side-bar-button name="Garage" route="vehicles" icon="time_to_leave" />
        <side-bar-button name="Feedback" route="feedback" icon="feedback" />
    </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SideBarButton from './side-bar-button.vue';

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