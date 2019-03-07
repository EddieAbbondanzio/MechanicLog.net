<template>
    <div class="border bg-white h-100 w-100 p-3 shadow">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'card-container',
})
export default class CardContainer extends Vue {}
</script>