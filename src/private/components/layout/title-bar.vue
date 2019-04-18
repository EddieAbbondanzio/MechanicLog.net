<style lang="scss" scoped>
.icon {
    height: 48px;
}
</style>


<template>
    <div class="px-4 py-2 bg-primary text-center clearfix position-relative" style="z-index: 100;">
        <!-- ML Icon -->
        <img class="icon d-inline-block float-left" src="../../../assets/logo.png">

        <h3 class="font-weight-bold text-light d-inline-block">MechanicLog</h3>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * Bar atop the page that has the user, and site logo in it.
 */
@Component({
    name: 'title-bar',
    components: {
    },
})
export default class TitleBar extends Vue {}
</script>