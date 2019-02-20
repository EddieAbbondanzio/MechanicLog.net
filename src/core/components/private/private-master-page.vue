<style lang="scss">
.page-content {
    height: 100vh;
}
</style>

<template>
    <div>
        <user-bar/>
        <side-bar/>

        <div class="p-2">
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import UserBar from "@/core/components/private/user-bar/user-bar.vue";
import SideBar from "@/core/components/private/side-bar/side-bar.vue";

/**
 * Master page for private pages of the site.
 */
@Component({
    name: "private-master-page",
    components: {
        SideBar,
        UserBar
    }
})
export default class PrivateMasterPage extends Vue {}
</script>