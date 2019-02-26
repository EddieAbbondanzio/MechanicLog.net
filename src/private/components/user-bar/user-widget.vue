<style lang="scss">
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.user-icon {
    vertical-align: middle;
}

.user-name {
    font-size: 1.25em;
    vertical-align: middle;
}

.user-widget {
    cursor: pointer;

    &:hover {
        background-color: darken($primary, 7.5%);
    }
}
</style>

<template>
    <div class="text-light user-widget px-2">
        <div class="dropdown">
            <div
                class="dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <material-icon icon="person" size="lg" class="pr-2 user-icon" title="Logged in as"/>
                <!-- Name of the User -->
                <span
                    class="user-name"
                >{{ currentUser.getFirstName() }}</span>
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <!-- <router-link class="dropdown-item" to="/settings">
                    <material-icon icon="settings" color="dark" class="align-bottom pr-2"/>
                    <span class="align-middle">Settings</span>
                </router-link> -->
                <router-link class="dropdown-item" to="/goodbye">
                    <material-icon icon="exit_to_app" color="dark" class="align-bottom pr-2"/>
                    <span class="align-middle">Log Out</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserMixin } from '@/user-system/user-mixin';
import MaterialIcon from '@/core/components/material-icon.vue';
import { User } from '@/user-system/entities/user';

/**
 * Widget that displays the active user on screen.
 */
@Component({
    name: 'user-widget',
    components: {
        MaterialIcon,
    },
})
export default class UserWidget extends UserMixin {
    /**
     * The currently logged in user.
     */
    private currentUser!: User;

    public created(): void {
        this.currentUser = User.CURRENT!;
    }
}
</script>