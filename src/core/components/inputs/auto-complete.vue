<style lang="scss" scoped>
.auto-complete-textbox[aria-invalid='true'] {
    input[type='text'] {
        border: 1px solid var(--red);
        border-left: 12px solid var(--red);
    }
}

.auto-complete-options {
    position: absolute;
    z-index: 9999;
    max-height: 408px;
    overflow-y: scroll;
    left: 0px;
    right: 0px;
}
</style>


<template>
    <div class="auto-complete-textbox position-relative">
        <input
            type="text"
            class="form-control"
            ref="autoTextbox"
            @focus="onInputFocus"
            @blur="onInputBlur"
            @keydown="onKeyPress"
            @input="onTextChange"
        >
        <div class="auto-complete-options" v-if="isActive && options.length > 0">
            <b-list-group class="d-relative">
                <b-list-group-item
                    v-for="(option, index) in matchedOptions"
                    v-bind:key="option"
                    :active="index == selectedIndex"
                    @mouseover="onMouseHover(index)"
                    @mousedown="onMouseClick(index)"
                >{{ option }}</b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Nullable } from '@/core/common/monads/nullable';

/**
 * An auto complete textbox that assists a user with picking
 * a value from the predefined list. Options are key value pairs
 * that have a numeric key greater than or equal to 0.
 */
@Component({
    name: 'auto-complete',
})
export default class AutoComplete extends Vue {
    public $refs!: {
        autoTextbox: HTMLInputElement;
    };

    /**
     * The auto complete options.
     */

    @Prop({ default: () => [] })
    public options!: string[];

    /**
     * The selected value
     */
    @Prop({ default: null })
    public value!: Nullable<string>;

    /**
     * Used by VeeValidate to enable custom validation.
     */
    public $_veeValidate = {
        value() {
            return this.value;
        },
    };

    /**
     * If the user is currently in the textobx.
     */
    private isActive!: boolean;

    /**
     * The active index of the options list.
     */
    private selectedIndex!: number;

    /**
     * The options matching the current text.
     */
    private matchedOptions!: string[];

    /**
     * Initilization of the component.
     */
    private created(): void {
        this.isActive = false;
        this.selectedIndex = -1;
        this.matchedOptions = this.options;
    }

    /**
     * Listens for when the v-model changes so we can update
     * the textbox.
     */
    @Watch('value')
    private onValueChange(value: string): void {
        this.$refs.autoTextbox.value = value;
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user enters the textbox.
     */
    private async onInputFocus(): Promise<void> {
        this.isActive = true;
        this.$emit('focus');
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user presses a button.
     */
    private async onKeyPress(event: KeyboardEvent): Promise<void> {
        if (event.key === 'ArrowUp') {
            if (this.selectedIndex >= 0) {
                this.selectedIndex--;
            }
        } else if (event.key === 'ArrowDown') {
            if (this.matchedOptions.length - 1 > this.selectedIndex) {
                this.selectedIndex++;
            }
        } else if (event.key === 'Tab') {
            if (this.selectedIndex >= 0 && this.matchedOptions.length > this.selectedIndex) {
                this.$refs.autoTextbox.value = this.matchedOptions[this.selectedIndex];
                this.$emit('input', this.matchedOptions[this.selectedIndex]);
            }
        }

        this.$forceUpdate();
    }

    /**
     * Event handler for when the text changes. We can't do this in onKeyPress
     * as it's before vue updates it.
     */
    public async onTextChange(): Promise<void> {
        const text = this.$refs.autoTextbox.value.toLowerCase();
        this.matchedOptions = this.options.filter((o) => o.toLowerCase().indexOf(text) !== -1);
        this.selectedIndex = -1;
        this.$emit('input', this.$refs.autoTextbox.value);
    }

    /**
     * Event handler for when the user hovers over an option.
     */
    private async onMouseHover(index: number): Promise<void> {
        this.selectedIndex = index;
        this.$forceUpdate();
    }

    /**
     * Event handler for when the user clicks an option.
     */
    private async onMouseClick(index: number): Promise<void> {
        this.selectedIndex = index;
        this.$refs.autoTextbox.value = this.matchedOptions[index];
        this.$emit('input', this.matchedOptions[index]);
    }

    /**
     * Event handler for when the user leaves the textbox.
     */
    private async onInputBlur(): Promise<void> {
        this.isActive = false;
        this.$emit('blur');
        this.$forceUpdate();
    }
}
</script>