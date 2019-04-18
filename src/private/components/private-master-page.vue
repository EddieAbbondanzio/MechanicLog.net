<style lang="scss">
.page-content {
    height: calc(100vh - 64px);
}
</style>

<template>
    <div>
        <title-bar/>
        <error-popup ref="errorPopup"/>

        <div class="d-flex flex-row align-self-stretch page-content">
            <side-bar class="d-flex flex-column align-self-stretch"/>

            <!-- Content of the page -->
            <div class="bg-light align-self-stretch w-100" style="position:relative;">
                <loading-bar v-if="isLoading()" style="position: absolute;"/>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import TitleBar from '../components/layout/title-bar.vue';
import SideBar from '@/private/components/layout/side-bar.vue';
import LoadingBar from '@/core/components/ux/loading-bar.vue';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
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
        ErrorPopup,
    },
})
export default class PrivateMasterPage extends Vue {
    public $refs!: {
        errorPopup: ErrorPopup;
    };

    public loadingCount: number = 0;

    /**
     * Prepare by subscribing to the event bus.
     */
    public created(): void {
        EventBus.on('error', this.onError);
        EventBus.on('loading', this.onLoading);
        EventBus.on('loaded', this.onLoaded);
    }

    public async onError(error: string): Promise<void> {
        this.$refs.errorPopup.show(error);
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