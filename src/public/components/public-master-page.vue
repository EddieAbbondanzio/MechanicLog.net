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

        <!-- Actual Page Content -->
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