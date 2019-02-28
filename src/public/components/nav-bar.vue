<style lang="scss" scoped>
.slanted-nav {
    height: 180px;
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 56%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
    width: 100%;
    z-index: -1;
}

.icon {
    height: 48px;
}

.nav-logo {
    img,
    h2 {
        display: inline-block;
    }
}

.nav-buttons {
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>

<template>
    <div class="text-center clearfix px-4 py-4 slanted-nav bg-primary">
        <div class="d-inline-block mx-auto nav-logo float-left">
            <router-link to="/">
                <img src="@/assets/logo.png" class="icon">
                <h2 class="font-weight-bold text-white text-center">MechanicLog</h2>
            </router-link>
        </div>

        <div class="d-inline-block nav-buttons float-right">
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
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * Public facing header bar for the site.
 */
@Component({
    name: 'nav-bar',
    components: {},
})
export default class NavBar extends Vue {}
</script>