<style lang="scss">
img {
    height: 96px;
    display: block;
}

h2 {
    text-align: center;
}
</style>


<template>
    <div class="text-light py-2">
        <img
            alt="MechanicLog logo"
            class="logo mx-auto"
            src="../../../../assets/logo.png"
            style="margin-left: auto; margin-right: auto;"
        >
        <h2 class="pt-2">MechanicLog</h2>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * The icon and logo of the site.
 */
@Component({
    name: 'brand-icon',
})
export default class BrandIcon extends Vue {
}
</script>