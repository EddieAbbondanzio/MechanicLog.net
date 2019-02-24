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

.auto-complete-option {
    cursor: pointer;
    background-color: $white;
    overflow-x: hidden;
    text-overflow: ellipsis;

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
            ref="textbox"
            @focus="onFocus"
            @blur="onBlur"
            @keyup="onTextChange"
        >
        <div class="auto-complete-list" v-if="isActive">
            <div
                v-for="option in matchedOptions"
                v-bind:key="option"
                class="p-1 border auto-complete-option"
                @click="onOptionClick(option)"
                :title="option"
            >
                <span>{{ option }}</span>
            </div>
        </div>

        <datalist v-if="$slots.default != null">
            <slot :list="optionsList"></slot>
        </datalist>
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
    public options?: string[];

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
     * The full options list
     */
    private optionsList!: string[];

    /**
     * If the textbox is currently active.
     */
    private isActive: boolean = false;

    public created() {
        this.optionsList = [];
    }

    /**
     * When the DOM is created, see if we need to pull in our list.
     */
    public mounted(): void {

        // User provided the list
        if (this.options != null) {
            this.optionsList = this.options;
        }
        // See if we can pull in them from the slots
        else if (this.$slots.default != null) {
            this.$slots.default.forEach((s) => {
                // Someday I'll know a better way to get this...
                this.optionsList.push((s.elm! as any)._value);
            });
        }
    }

    /**
     * User is entering the textbox. Show the list.
     */
    protected onFocus() {
        this.matchedOptions = this.optionsList;
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
        }, 150);
    }

    /**
     * Event handler for when the text in the box changes.
     */
    protected onTextChange(): void {
        const value: string = this.$refs.textbox.value;
        this.matchedOptions = this.optionsList.filter((opt) => opt.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        this.$emit('input', value);
    }

    /**
     * User clicked an option. Save it, and show the value.
     */
    public onOptionClick(opt: string) {
        this.isActive = false;
        this.$emit('input', opt);
    }
}
</script>