<template>
    <div class="d-flex flex-column h-100">
        <tool-bar>
            <slot name="tool-bar"></slot>
        </tool-bar>

        <div class="p-3 h-100">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ToolBar from '@/private/components/tool-bar/tool-bar.vue';

@Component({
    name: 'page-content',
    components: {
        ToolBar,
    },
})
export default class PageContent extends Vue {}
</script>