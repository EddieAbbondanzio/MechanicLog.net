<template>
    <div class="border bg-white shadow">
        <slot name="header"></slot>

        <div class="p-3">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'card-container',
})
export default class CardContainer extends Vue {}
</script>