<template>
    <option :value="value"></option>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * An option for the autocomplete textbox.
 */
@Component({
    name: 'auto-complete-option',
})
export default class AutoCompleteOption extends Vue {
    /**
     * The value of the option.
     */
    @Prop()
    public value!: string;
}
</script>