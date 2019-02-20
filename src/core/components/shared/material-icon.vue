<template>
    <i :class="cssClasses">{{ icon }}</i>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Themeable } from './themeable';
import { ThemeColor } from '@/core/components/shared/theme-color';

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
export default class MaterialIcon extends Vue implements Themeable {
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

    /**
     * The color theme of the component.
     */
    @Prop({ default: 'light'})
    public color!: ThemeColor;

    /**
     * The CSS class list to use.
     */
    get cssClasses(): string {
        return `material-icons icon-${this.size} text-${this.color}`;
    }
}
</script>
