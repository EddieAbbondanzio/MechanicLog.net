<style lang="scss" scoped>
.icon {
    height: 48px;
}
</style>


<template>
    <div class="mx-0 px-0" style="position: relative; min-height: 100vh;">
        <public-title-bar/>

        <router-view></router-view>

        <public-page-footer/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PublicTitleBar from '@/public/components/layout/public-title-bar.vue';
import PublicPageFooter from '@/public/components/layout/public-page-footer.vue';

@Component({
    components: {
        PublicPageFooter,
        PublicTitleBar,
    },
})
export default class PublicMasterPage extends Vue {}
</script>