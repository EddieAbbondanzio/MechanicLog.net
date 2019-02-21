<template>
    <div class="pt-4 pb-2">
        <garage-bar-tab name="Vehicles" :route="{ name: 'vehicles' }" icon="directions_car"/>
        <garage-bar-tab name="Mechanics" :route="{ name: 'mechanics' }" icon="build"/>
        <hr class="my-0 py-0">
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import GarageBarTab from './garage-bar-tab.vue';

/**
 * Navigation bar of the garage container/
 */
@Component({
    name: "garage-bar",
    components: {
        GarageBarTab
    }
})
export default class GarageBar extends Vue {}
</script>