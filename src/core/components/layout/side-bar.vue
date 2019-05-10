<style lang="scss" scoped>
@import './public/bootstrap/_functions';
@import './public/bootstrap/_variables';

.side-bar {
    width: 256px;

    button {
        background-color: $white;
    }

    button:hover {
        background-color: darken($white, 7.5%);
    }

    button:active {
        background-color: darken($white, 10);
    }
}

.side-bar-section-header {
    font-size: 1.5em !important;
}

.account-links {
    a {
        width: 100% !important;
        padding-top: 2px;
        padding-bottom: 2px;
    }

    button {
        border-radius: 0px !important;
        padding-left: 1em;
        text-align: left !important;
    }
}
</style>

<template>
    <div class="side-bar bg-white border-right d-flex flex-column">
        <!-- User Info -->
        <div class="border-bottom align-self-stretch py-4 d-flex flex-column align-items-center">
            <material-icon
                icon="person"
                size="xl"
                class="p-2 user-icon rounded-circle border bg-light"
                color="secondary"
                title="Logged in as"
            />

            <h3 class="pt-3">{{ user.username }}</h3>
        </div>

        <div class="border-bottom my-auto h-100 py-4">
            <router-link class="w-100" to="/vehicles">
                <b-button variant="white" class="shadow-none w-100 rounded-0 text-left">
                    <material-icon icon="directions_car" color="dark" class="align-middle pr-2"/>
                    <h4 class="pb-0 mb-0 d-inline-block align-middle">Vehicles</h4>
                </b-button>
            </router-link>
        </div>

        <div class="border-bottom align-self-bottom d-flex flex-column py-4 account-links">
            <router-link to="/user/feedback" class="w-100">
                <b-button variant="white" class="shadow-none w-100 rounded-0">
                    <material-icon icon="feedback" color="dark" class="align-bottom pr-2"/>
                    <span class="align-middle">Feedback</span>
                </b-button>
            </router-link>

            <router-link to="/user/subscription">
                <b-button variant="white" class="shadow-none w-100">
                    <material-icon icon="card_membership" color="dark" class="align-bottom pr-2"/>
                    <span class="align-middle">Subscription</span>
                </b-button>
            </router-link>

            <router-link :to="{ name: 'user-settings' }">
                <b-button variant="white" class="shadow-none w-100">
                    <material-icon icon="settings" color="dark" class="align-bottom pr-2"/>
                    <span class="align-middle">Settings</span>
                </b-button>
            </router-link>

            <router-link to="/goodbye">
                <b-button variant="white" class="shadow-none w-100">
                    <material-icon icon="exit_to_app" color="dark" class="align-bottom pr-2"/>
                    <span class="align-middle">Log Out</span>
                </b-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';
import { User } from '@/user-system/entities/user';

/**
 * Side bar used on the dashboard pages.
 */
@Component({
    name: 'side-bar',
    components: {
        MaterialIcon,
    },
})
export default class SideBar extends Vue {
    /**
     * The currently logged in user.
     */
    private user!: User;

    public created(): void {
        this.user = User.CURRENT!;
    }
}
</script>