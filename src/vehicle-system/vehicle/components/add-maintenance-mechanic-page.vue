<template>
    <!-- Step 1: Who -->
    <form>
        <p>Select the mechanic that worked on the vehicle. Mechanics can be added by navigating to the
            <router-link to="/garage/mechanics">Mechanics</router-link> page.
        </p>

        <b-form-group>
            <label class="required" for="mechanic-select">Mechanic</label>
            <b-form-select
                v-model="selectedOption"
                :options="options"
                @input="onSelect"
                id="mechanic-select"
                name="mechanic"
                v-validate="'required'"
            >
                <template slot="first">
                    <option :value="null" disabled>Who performed the work?</option>
                </template>
            </b-form-select>
        </b-form-group>

        <span class="text-danger">{{ errors.first('mechanic') }}</span>
    </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MechanicMixin } from '@/vehicle-system/mechanic/mixins/mechanic-mixin';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';
import { Nullable } from '@/core/common/monads/nullable';
import { Validatable } from '@/core/common/validatable.ts';

/**
 * Mechanic page for the AddMaintenancePopup.
 */
@Component({
    name: 'add-maintenance-mechanic-page',
})
export default class AddMaintenanceMechanicPage extends MechanicMixin {
    /**
     * The mechanic they selected.
     */
    @Prop()
    public value!: Nullable<Mechanic>;

    protected selectedOption!: Nullable<Mechanic>;

    /**
     * The options of the drop down.
     */
    protected options: { value: Nullable<Mechanic>; text: string }[] = [];

    /**
     * All of the possible mechanics.
     */
    public mechanics: Mechanic[] = [];

    /**
     * On init, pull in the mechanics.
     */
    public async created(): Promise<void> {
        this.selectedOption = this.value == null ? null : this.value;
        this.mechanics = await this.$getMechanics();
        this.options = this.mechanics.map((m) => ({ value: m, text: m.name }));
    }

    /**
     * On select, propogate the event higher up.
     */
    public onSelect(): void {
        this.$emit('input', this.selectedOption);
    }

    /**
     * Validate the content of the page before proceeding.
     */
    public async validate(): Promise<boolean> {
        return this.$validator.validate();
    }
}
</script>