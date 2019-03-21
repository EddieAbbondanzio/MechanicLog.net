<style lang="scss">
.page-content {
    height: 100vh;
}
</style>

<template>
    <div class="d-flex flex-column" style="min-height: 100vh;">
        <title-bar/>

        <div class="d-flex flex-row align-self-stretch h-100">
            <side-bar class="d-flex flex-column align-self-stretch"/>
            <div class="bg-light align-self-stretch w-100" style="position:relative;">
                <loading-bar v-if="isLoading()" style="position: absolute;"/>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import TitleBar from '../components/title-bar/title-bar.vue';
import SideBar from '../components/side-bar/side-bar.vue';
import LoadingBar from '@/core/components/ux/loading-bar.vue';
import { EventBus } from '@/core/event/event-bus';

/**
 * Master page for private pages of the site.
 */
@Component({
    name: 'private-master-page',
    components: {
        SideBar,
        TitleBar,
        LoadingBar,
    },
})
export default class PrivateMasterPage extends Vue {
    public loadingCount: number = 0;

    public created(): void {
        EventBus.on('loading', this.onLoading);
        EventBus.on('loaded', this.onLoaded);
    }

    public async onLoading(): Promise<void> {
        this.loadingCount++;
    }

    public async onLoaded(): Promise<void> {
        this.loadingCount--;
    }

    public isLoading(): boolean {
        return this.loadingCount > 0;
    }
}
</script>