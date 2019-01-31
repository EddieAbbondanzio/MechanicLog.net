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
        <div class="dropdown">
            <a
                class="btn btn-primary dropdown-toggle btn-block user-name"
                href="#"
                role="button"
                id="user-drop-down"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <i
                    class="material-icons icon-xl pr-2 d-block"
                    style="vertical-align: middle"
                    title="Logged in as"
                >person</i>
                {{ $currentUser.name.indexOf(' ') != -1 ? $currentUser.name.split(' ')[0] : $currentUser.name }}
            </a>

            <div class="dropdown-menu" aria-labelledby="user-drop-down">
                <a class="dropdown-item" href="#">Settings</a>
                <a class="dropdown-item" href="#" @click="logOutUser">Log Out</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserMixin } from '@/user-system/mixins/user-mixin';

/**
 * User component that shows the name of the active user.
 */
@Component({
    name: 'side-bar-user',
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