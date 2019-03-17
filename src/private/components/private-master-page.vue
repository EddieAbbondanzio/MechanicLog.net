<style lang="scss">
.page-content {
    height: 100vh;
}
</style>

<template>
    <div class="d-flex flex-column flex-grow-1" style="min-height: 100vh;">
        <title-bar/>

        <div class="d-flex flex-row flex-grow-1 h-100">
            <side-bar class="align-self-stretch"/>
            <div class="bg-light align-self-stretch w-100">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import TitleBar from '../components/title-bar/title-bar.vue';
import SideBar from '../components/side-bar/side-bar.vue';

/**
 * Master page for private pages of the site.
 */
@Component({
    name: 'private-master-page',
    components: {
        SideBar,
        TitleBar,
    },
})
export default class PrivateMasterPage extends Vue {}
</script>