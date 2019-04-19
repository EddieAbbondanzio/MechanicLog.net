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
    <div class="px-4 py-3 bg-primary d-flex flex-row justify-content-between align-items-center">
        <div>
            <router-link to="/">
                <img src="@/assets/logo.png" class="icon">
                <h3 class="font-weight-bold text-white d-inline-block">MechanicLog</h3>
            </router-link>
        </div>

        <div class="buttons">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="http://blog.mechaniclog.net">Blog</a>
            <a href="#">Contact</a>
        </div>

        <div>
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