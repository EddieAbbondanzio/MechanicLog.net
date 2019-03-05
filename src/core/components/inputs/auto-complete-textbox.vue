<style lang="scss">
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.auto-complete-list {
    position: absolute;
    z-index: 9999;
    width: 100%;
    max-height: 408px;
    overflow-y: scroll;
}
</style>

<template>
    <div class="d-block" style="position: relative;">
        <input
            :class="cssClass"
            type="text"
            :placeholder="placeholder"
            v-model="text"
            @focus="onFocus"
            @blur="onBlur"
            @keyup="onTextChange"
            :disabled="disabled"
        >
        <b-list-group class="auto-complete-list" v-if="isActive" tabindex="-1">
            <b-list-group-item
                href="#"
                tabindex="-1"
                v-for="option in matchedOptions"
                v-bind:key="option.value"
                @click="onOptionClick(option.value)"
                :title="option.text"
            >{{ option.text }}</b-list-group-item>
        </b-list-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Nullable } from '@/core/common/monads/nullable';

/**
 * Key value type for the auto complete textbox.
 */
// export type AutoCompleteTextboxOption = ;

/**
 * Auto complete textbox that can allow a user to search
 * and enter data based off a predefined list.
 */
@Component({
    name: 'auto-complete-textbox',
})
export default class AutoCompleteTextbox extends Vue {
    /**
     * The selected value
     */
    @Prop()
    public value!: number;

    /**
     * The placeholder to show when no input exists
     */
    @Prop()
    public placeholder!: string;

    /**
     * The auto complete options.
     */
    @Prop()
    public options!: { value: number; text: string }[];

    @Prop({ default: false })
    public disabled!: boolean;

    public $_veeValidate = {
        value() {
            return this.value;
        },
    };

    /**
     * The CSS class
     */
    private cssClass!: string;

    /**
     * The text in the textbox.
     */
    private text!: string;

    /**
     * The options matching the current text.
     */
    private matchedOptions!: { value: number; text: string }[];

    /**
     * If the textbox is currently active.
     */
    private isActive!: boolean;

    public created(): void {
        this.cssClass = 'form-control';
        this.isActive = false;
        this.text = this.value !== -1 ? this.options.find((o) => o.value === this.value)!.text : '';
        this.matchedOptions = [];
    }

    /**
     * User is entering the textbox. Show the list.
     */
    protected onFocus() {
        this.matchedOptions = this.options;
        this.isActive = true;
        this.$emit('focus');
        this.$forceUpdate();
    }

    /**
     * User is leaving the textbox. Hide things
     */
    protected onBlur() {
        setTimeout(() => {
            this.isActive = false;
            this.$emit('blur');
            this.$forceUpdate();
        }, 150);
    }

    /**
     * Event handler for when the text in the box changes.
     */
    protected onTextChange(event: any): void {
        this.matchedOptions = this.options.filter((opt) => opt.text.toLowerCase().indexOf(this.text.toLowerCase()) !== -1);
        const selectedValue = this.options.find((opt) => opt.text === this.text);

        if (selectedValue != null) {
            this.$emit('input', selectedValue.value);
        } else {
            this.$emit('input', -1);
        }

        this.$forceUpdate();
    }

    /**
     * User clicked an option. Save it, and show the value.
     */
    protected onOptionClick(opt: number) {
        this.isActive = false;
        this.$emit('input', opt);
        this.text = this.options.find((o) => o.value === opt)!.text;

        this.$forceUpdate();
    }

    /**
     * Get the active option that the user has selected.
     */
    public getActiveOptions(): Nullable<{ value: number; text: string }> {
        if (this.value !== -1) {
            const match = this.options.find((opt) => opt.value === this.value);

            if (match != null) {
                return match;
            }
        }

        return null;
    }

    public valid(): void {
        this.cssClass = 'form-control';
        this.$forceUpdate();
    }

    public invalid(): void {
        this.cssClass = 'form-control is-invalid';
        this.$forceUpdate();
    }

    /**
     * Clear the textbox.
     */
    public clear(): void {
        this.isActive = false;
        this.text = '';
        this.cssClass = 'form-control';
        this.$forceUpdate();
    }
}
</script>
