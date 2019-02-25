<template>
    <div>
        <form>
            <p>
                What was the odomoter reading, and date of the maintenance, or repair when it was performed?
            </p>

            <!-- Name Textbox -->
            <div class="form-group">
                <label class="required" for="mileage-textbox">Mileage</label>
                <input
                    type="text"
                    class="form-control"
                    id="mileage-textbox"
                    placeholder="123000"
                    v-model="mileage"
                    @keyup="onInput"
                    name="mileage"
                    v-validate="'required|numeric'"
                >
                <b-form-invalid-feedback>{{ errors.first('mileage') }}</b-form-invalid-feedback>
            </div>

            <!-- Name Textbox -->
            <div class="form-group">
                <label class="required" for="date-textbox">Date</label>
                <input
                    type="date"
                    class="form-control"
                    id="date-textbox"
                    v-model="date"
                    @blur="onInput"
                    name="date"
                    v-validate="'required'"
                >
                <b-form-invalid-feedback>{{ errors.first('date') }}</b-form-invalid-feedback>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Nullable } from '@/core/common/monads/nullable';

/**
 * When the maintenance occured page of the AddMaintenancePopup
 */
@Component({
    name: 'add-maintenance-when-page',
})
export default class AddMaintenanceWhenPage extends Vue {
    /**
     * The data of the page.
     */
    @Prop()
    public value!: { mileage: number | null; date: Date | null };

    protected date!: Nullable<Date>;

    protected mileage!: Nullable<number>;

    public created(): void {
        this.date = this.value.date;
        this.mileage = this.value.mileage;
    }

    /**
     * Validate the content of the page before proceeding.
     */
    public async validate(): Promise<boolean> {
        return this.$validator.validate();
    }

    protected onInput(): void {
        this.$emit('input', { mileage: this.mileage, date: this.date });
    }
}
</script>