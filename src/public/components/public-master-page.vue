<style lang="scss" scoped>
.page-container {
    //Account for the footer
    padding-bottom: 128px;
    position: relative;
    display: flex;
    flex-direction: column;
}
</style>

<template>
    <div class="page-container bg-light">
        <public-title-bar/>
        <loading-bar v-if="isLoading()" style="position: absolute; top: 80px;"/>

        <!-- Actual Page Content -->
        <router-view></router-view>

        <public-page-footer/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PublicTitleBar from '@/public/components/layout/public-title-bar.vue';
import PublicPageFooter from '@/public/components/layout/public-page-footer.vue';
import { EventBus } from '@/core/event/event-bus';
import LoadingBar from '@/core/components/ux/loading-bar.vue';

@Component({
    components: {
        PublicPageFooter,
        PublicTitleBar,
        LoadingBar,
    },
})
export default class PublicMasterPage extends Vue {
    public loadingCount: number = 0;

    /**
     * Prepare by subscribing to the event bus.
     */
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