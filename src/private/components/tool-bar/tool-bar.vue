<style lang="scss" scoped>
.tool-bar {
    min-height: 86px;
}
</style>


<template>
    <div
        class="w-100 bg-white shadow px-3 py-3 border-bottom tool-bar d-flex flex-row align-items-center"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'new-component',
})
export default class ToolBar extends Vue {}
</script>