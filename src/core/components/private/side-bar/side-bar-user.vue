<style lang="scss">
.user-profile {
    width: 100%;
    text-align: center;
}

.user-name {
    font-size: 24px;
}
</style>


<template>
    <div class="user-profile text-light">
        <!-- User Drop Down -->
        <b-dropdown id="user-dropdown" variant="link" class="dropright" no-caret>
            <div slot="button-content">
                <a
                    class="btn btn-primary dropdown-toggle btn-block user-name"
                    href="#"
                    role="button"
                    id="user-drop-down"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <material-icon
                        icon="person"
                        size="xl"
                        class="d-block pr-2"
                        title="Logged in as"
                    />
                    {{ $currentUser.name.indexOf(' ') != -1 ? $currentUser.name.split(' ')[0] : $currentUser.name }}
                </a>
            </div>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <b-dropdown-item href="#" @click="logOutUser">Log Out</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserMixin } from '@/user-system/mixins/user-mixin';
import MaterialIcon from '@/core/components/shared/material-icon.vue';

/**
 * User component that shows the name of the active user.
 */
@Component({
    name: 'side-bar-user',
    components: {
        MaterialIcon,
    },
})
export default class SideBarUser extends UserMixin {
    /**
     * When the page loads, check if we need to fire off a login
     * request to the backend.
     */
    public async created(): Promise<void> {
        if (this.$hasAuthToken() && this.$currentUser == null) {
            await this.$relogin();
        }
    }

    public async logOutUser(): Promise<void> {
        // await this.$logOut();
        this.$router.push({ name: 'home' });
    }
}
</script>