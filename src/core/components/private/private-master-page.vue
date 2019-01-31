<template>
    <div>
        <!-- Side Bar -->
        <side-bar/>

        <!-- Content -->
        <main class="p-4" style="width: auto; overflow: hidden;">
            <!-- Header -->
            <div v-if="title != null">
                <h1>{{ title }}</h1>
                <hr>
            </div>

            <!-- Child Content -->
            <slot></slot>
        </main>
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
    @Prop()
    public title!: string;
}
</script>