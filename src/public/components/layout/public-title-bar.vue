<style lang="scss" scoped>
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.icon {
    height: 48px;
    display: inline-block;
}

.buttons a {
    color: lighten($gray-300, 2.5);
    text-decoration: none !important;
    font-weight: bold;
    margin-left: map-get($map: $spacers, $key: 3);
    margin-right: map-get($map: $spacers, $key: 3);

    &:hover {
        color: $gray-100;
    }

    &:active {
        color: $white;
    }
}
</style>

<template>
    <div>
        <b-navbar toggleable variant="primary" type="dark" class="justify-content-between">
            <!-- Logo -->
            <b-navbar-brand>
                <router-link to="/">
                    <img src="@/assets/logo.png" class="icon">
                    <h3 class="font-weight-bold text-white d-inline-block">MechanicLog</h3>
                </router-link>
            </b-navbar-brand>

            <!-- Drop Down -->
            <div>
                <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
                <b-collapse id="nav-text-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="#">Features</b-nav-item>
                        <b-nav-item to="#">Pricing</b-nav-item>
                        <b-nav-item href="http://blog.mechaniclog.net">Blog</b-nav-item>
                        <b-nav-item to="#">Contact</b-nav-item>
                        <b-nav-item to="/login" class="d-sm-none">Login</b-nav-item>
                        <b-nav-item to="/register" class="d-sm-none">Sign Up</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </div>

            <!-- Login / Sign Up Button. -->
            <div class="d-none d-sm-block">
                <router-link to="/login">
                    <b-btn
                        variant="outline-light"
                        class="rounded mr-2"
                        @click="$emit('login')"
                    >Login</b-btn>
                </router-link>
                <router-link to="/register">
                    <b-btn
                        variant="outline-light"
                        class="rounded ml-2"
                        @click="$emit('sign-up')"
                    >Sign Up</b-btn>
                </router-link>
            </div>
        </b-navbar>
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