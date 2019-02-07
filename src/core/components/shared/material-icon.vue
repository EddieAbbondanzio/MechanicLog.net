<template>
    <i :class="'material-icons icon-' + size">{{ icon }}</i>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * Size possibilities of the icon.
 */
export type Size = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Materials icon.
 */
@Component({
    name: 'material-icon',
})
export default class MaterialIcon extends Vue {
    /**
     * The size of the icon.
     */
    @Prop({ default: 'md' })
    public size!: Size;

    /**
     * The name of the icon to render.
     */
    @Prop()
    public icon!: string;
}
</script>