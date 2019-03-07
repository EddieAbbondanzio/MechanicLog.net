

<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GarageBar from './garage-bar.vue';

/**
 * Container that puts some of the common logic for the garage pages together.
 */
@Component({
    name: 'garage-container',
    components: {
        GarageBar,
    },
})
export default class GarageContainer extends Vue {
    public updated(): void {
        if (this.$route.name === 'garage') {
            this.$router.push({ name: 'vehicles' });
        }
    }
}
</script>