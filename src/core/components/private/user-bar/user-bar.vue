<style lang="scss" scoped>
.icon {
    height: 48px;
}
</style>


<template>
    <div class="px-4 py-2 bg-primary text-center clearfix">
        <!-- ML Icon -->
        <img class="icon d-inline-block float-left" src="../../../../assets/logo.png">

        <h3 class="font-weight-bold text-light d-inline-block">MechanicLog</h3>

        <div class="float-right">
            <user-widget />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import UserWidget from '@/core/components/private/user-bar/user-widget.vue';

/**
 * Bar atop the page that has the user, and site logo in it.
 */
@Component({
    name: "user-bar",
    components: {
        UserWidget,
    }
})
export default class UserBar extends Vue {}
</script>