<template>
    <div class="px-3 pt-3 border-bottom shadow w-100" style="height: 78px; position: relative">
        <garage-bar-tab name="Vehicles" :route="{ name: 'vehicles' }" icon="directions_car"/>
        <garage-bar-tab name="Mechanics" :route="{ name: 'mechanics' }" icon="build"/>

        <div class="float-right">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GarageBarTab from './garage-bar-tab.vue';

/**
 * Navigation bar of the garage container/
 */
@Component({
    name: 'garage-bar',
    components: {
        GarageBarTab,
    },
})
export default class GarageBar extends Vue {}
</script>