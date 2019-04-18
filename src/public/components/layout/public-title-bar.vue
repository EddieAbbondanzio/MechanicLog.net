<style lang="scss" scoped>
.icon {
    height: 48px;
    display: inline-block;
}
</style>

<template>
    <div class="px-4 py-2 bg-primary text-center clearfix position-relative" style="z-index: 100;">
        <div class="d-inline-block mx-auto nav-logo float-left">
            <router-link to="/">
                <img src="@/assets/logo.png" class="icon">
                <h3 class="font-weight-bold text-white d-inline-block">MechanicLog</h3>
            </router-link>
        </div>

        <div class="d-inline-block nav-buttons float-right">
            <a
                href="http://blog.mechaniclog.net"
                class="text-light mx-2 nav-link d-inline-block"
            >Blog</a>

            <router-link to="/login">
                <b-btn variant="outline-light" class="rounded mr-2" @click="$emit('login')">Login</b-btn>
            </router-link>
            <router-link to="/register">
                <b-btn
                    variant="outline-light"
                    class="rounded ml-2"
                    @click="$emit('sign-up')"
                >Sign Up</b-btn>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * Bar atop the page that has the user, and site logo in it.
 */
@Component({
    name: 'private-title-bar',
    components: {},
})
export default class PublicTitleBar extends Vue {}
</script>