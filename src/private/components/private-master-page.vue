<style lang="scss">
.page-content {
    height: 100vh;
}
</style>

<template>
    <div class="page-content">
        <user-bar/>
        <side-bar/>

        <div class="d-inline-block align-top bg-light" style="width: calc(100% - 256px); height: calc(100vh - 64px);">
            <router-view></router-view>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import UserBar from "../components/user-bar/user-bar.vue";
import SideBar from "../components/side-bar/side-bar.vue";

/**
 * Master page for private pages of the site.
 */
@Component({
    name: "private-master-page",
    components: {
        SideBar,
        UserBar,
    }
})
export default class PrivateMasterPage extends Vue {

}
</script>