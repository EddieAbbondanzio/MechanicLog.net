<template>
    <div class="border bg-white shadow">
        <slot name="header"></slot>

        <div class="p-3" v-if="!noPadding">
            <slot></slot>
        </div>
        <slot v-else></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'card-container',
})
export default class CardContainer extends Vue {
    @Prop({ default: false })
    public noPadding!: boolean;
}
</script>