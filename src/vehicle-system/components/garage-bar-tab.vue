<style lang="scss">
@import './public/bootstrap/_functions';
@import './public/bootstrap/_variables';

.garage-bar-tab {
    display: inline-block;
    position: relative;
    height: 100%;

    a {
        font-size: 1.5em;
    }

    .router-link-active {
        color: $dark !important;
    }

    .router-link-active:after {
        content: '';
        display: block;
        left: 0px;
        right: 0px;
        bottom: 0px;
        position: absolute;
        margin-top: 4px;
        height: 4px;
        background-color: $primary;
    }
}

.garage-bar-tab-indicator {
    height: 4px;
    width: 100%;
    display: inline-block;
    vertical-align: bottom;
}
</style>


<template>
    <div class="garage-bar-tab">
        <router-link class="px-4 d-inline-block text-muted" :to="route">
            <material-icon :icon="icon" size="md" color="dark"/>
            {{ name }}
        </router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';

/**
 * Navigation tab of hte garage bar.
 */
@Component({
    name: 'garage-bar-tab',
    components: {
        MaterialIcon,
    },
})
export default class GarageBarTab extends Vue {
    /**
     * The name to display on screen.
     */
    @Prop()
    public name!: string;

    /**
     * The link it goes to.
     */
    @Prop()
    public route!: string;

    /**
     * The material icon to use.
     */
    @Prop()
    public icon!: string;
}
</script>