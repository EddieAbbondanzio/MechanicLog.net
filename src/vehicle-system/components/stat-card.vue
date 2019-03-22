

<template>
    <card-container class="stat-card" style="position: relative;">
        <div
            :class="`bg-${color} d-flex align-items-center justify-content-center`"
            style="position: absolute; left: 0px; top: 0px; bottom: 0px; right: 80%;"
        >
            <material-icon :icon="icon" color="white" size="lg"/>
        </div>
        <div style="margin-left: 20%;">
            <h4 :class="`text-${color} text-center`">{{ title }}</h4>
            <h1 class="text-center">{{ text }}</h1>
        </div>
    </card-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardContainer from '@/core/components/cards/card-container.vue';
import { ThemeColor } from '@/core/components/theme-color';
import MaterialIcon from '@/core/components/material-icon.vue';

/**
 * Card that can hold a single stat
 */
@Component({
    name: 'stat-card',
    components: {
        CardContainer,
        MaterialIcon,
    },
})
export default class StatCard extends Vue {
    /**
     * The icon to display.
     */
    @Prop()
    public icon!: string;

    /**
     * The color of the side bar, and title text.
     */
    @Prop()
    public color!: ThemeColor;

    /**
     * The title of the card.
     */
    @Prop()
    public title!: string;

    /**
     * The text of the card.
     */
    @Prop()
    public text!: string;
}
</script>