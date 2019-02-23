<style lang="scss">
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.auto-complete-list {
    position: absolute;
    z-index: 9999;
    width: 100%;
}

.auto-complete-option {
    cursor: pointer;
    background-color: $white;

    &:hover {
        background-color: darken($white, 7.5%);
    }

    &:active {
        background-color: darken($white, 10%);
    }
}
</style>

<template>
    <div class="d-inline-block" style="position: relative;">
        <input
            type="text"
            :placeholder="placeholder"
            :value="value"
            @focus="onFocus"
            @blur="onBlur"
            @keyup="onTextChange($refs.textbox.value)"
            ref="textbox"
        >
        <div class="auto-complete-list" v-if="isActive">
            <div
                v-for="option in matchedOptions"
                v-bind:key="option.name"
                class="p-1 border auto-complete-option"
                @click="onOptionClick(option)"
            >{{ option }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Nullable } from '@/core/common/monads/nullable';

/**
 * Auto complete textbox that can allow a user to search
 * and enter data based off a predefined list.
 */
@Component({
    name: 'auto-complete-textbox',
})
export default class AutoCompleteTextbox extends Vue {
    public $refs!: {
        textbox: HTMLInputElement;
    };

    /**
     * The value in the textbox
     */
    @Prop()
    public value!: string;

    /**
     * The placeholder to show when no input exists
     */
    @Prop()
    public placeholder!: string;

    /**
     * The auto complete options.
     */
    @Prop()
    public options!: string[];

    public $_veeValidate = {
        value() {
            return this.value;
        },
    };

    /**
     * The options matching the current text.
     */
    private matchedOptions: string[] = [];

    /**
     * If the textbox is currently active.
     */
    private isActive: boolean = false;

    /**
     * User is entering the textbox. Show the list.
     */
    protected onFocus() {
        this.matchedOptions = this.options;
        this.isActive = true;
        this.$emit('focus');
    }

    /**
     * User is leaving the textbox. Hide things
     */
    protected onBlur() {
        setTimeout(() => {
            this.isActive = false;
            this.$emit('blur');
        }, 100);
    }

    protected onTextChange(value: string): void {
        this.matchedOptions = this.options.filter((opt) => opt.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        this.$emit('input', value);
    }

    /**
     * User clicked an option. Save it, and show the value.
     */
    public onOptionClick(opt: string) {
        this.$refs.textbox.value = opt;
        this.isActive = false;
    }
}
</script>