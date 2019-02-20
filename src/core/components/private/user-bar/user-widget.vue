<style lang="scss">
    .user-icon {
        vertical-align: middle;
    }

    .user-name {
        font-size: 1.25em;
        vertical-align: middle;
    }
</style>

<template>
    <div class="text-light">
        <material-icon icon="person" size="lg" class="pr-2 user-icon" title="Logged in as"/>
        <!-- Name of the User -->
        <span class="user-name">{{ $currentUser.name.indexOf(' ') != -1 ? $currentUser.name.split(' ')[0] : $currentUser.name }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { UserMixin } from "@/user-system/mixins/user-mixin";
import MaterialIcon from "@/core/components/shared/material-icon.vue";

/**
 * Widget that displays the active user on screen.
 */
@Component({
    name: "user-widget",
    components: {
        MaterialIcon
    }
})
export default class UserWidget extends UserMixin {}
</script>