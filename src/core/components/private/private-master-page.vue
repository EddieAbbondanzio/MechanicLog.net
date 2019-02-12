<style lang="scss">
.page-content {
    width: auto;
    overflow-x: hidden;
    height: 100vh;
}
</style>


<template>
    <div class="bg-gray-200 text-dark">
        <!-- Side Bar -->
        <side-bar/>

        <!-- Content -->
        <div class="container-fluid page-content p-4">
            <div class="row">
                <!-- Header -->
                <div class="col-12">
                    <header class="bg-light rounded px-4 py-2 mb-4">
                        <slot name="header"></slot>
                    </header>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SideBar from '@/core/components/private/side-bar/side-bar.vue';

/**
 * Master page for private pages of the site.
 */
@Component({
    name: 'private-master-page',
    components: {
        SideBar,
    },
})
export default class PrivateMasterPage extends Vue {
}
</script>