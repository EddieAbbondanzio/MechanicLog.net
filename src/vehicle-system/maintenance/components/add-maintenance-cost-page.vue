<template>
    <div>
        <form>
            <div class="form-group">
                <b-form-group label="Cost Type">
                    <b-form-radio value="total" name="costType" v-model="costType" @change="updateCostTab">Total</b-form-radio>
                    <b-form-radio value="categorized" name="costType" v-model="costType" @change="updateCostTab">Categorized</b-form-radio>
                </b-form-group>
            </div>

            <!-- Total Cost Tab -->
            <div v-if="costType == 'total'">
                <div class="form-group">
                    <label class="required" for="total-cost-textbox">Total Cost</label>
                    <input
                        type="text"
                        class="form-control"
                        id="total-cost-textbox"
                        placeholder="499.99"
                        ref="totalCostField"
                        name="totalCost"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('totalCost') }}</b-form-invalid-feedback>
                </div>
            </div>
            <!-- Categorized Cost Tab -->
            <div v-if="costType == 'categorized'">
                <div class="form-group">
                    <label class="required" for="total-cost-textbox">Labor Cost</label>
                    <input
                        type="text"
                        class="form-control"
                        id="total-cost-textbox"
                        placeholder="499.99"
                        ref="totalCostField"
                        name="totalCost"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('totalCost') }}</b-form-invalid-feedback>
                </div>
                <div class="form-group">
                    <label class="required" for="total-cost-textbox">Parts Cost</label>
                    <input
                        type="text"
                        class="form-control"
                        id="total-cost-textbox"
                        placeholder="499.99"
                        ref="totalCostField"
                        name="totalCost"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('totalCost') }}</b-form-invalid-feedback>
                </div>
                <div class="form-group">
                    <label for="total-cost-textbox">Taxes & Fees Cost</label>
                    <input
                        type="text"
                        class="form-control"
                        id="total-cost-textbox"
                        placeholder="499.99"
                        ref="totalCostField"
                        name="totalCost"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('totalCost') }}</b-form-invalid-feedback>
                </div>
                <div class="form-group">
                    <label for="total-cost-textbox">Other Cost</label>
                    <input
                        type="text"
                        class="form-control"
                        id="total-cost-textbox"
                        placeholder="499.99"
                        ref="totalCostField"
                        name="totalCost"
                        v-validate="'required|numeric'"
                    >
                    <b-form-invalid-feedback>{{ errors.first('totalCost') }}</b-form-invalid-feedback>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * Cost details page for the add maintenance popup.
 */
@Component({
    name: 'add-maintenance-cost-page',
})
export default class AddMaintenanceCostPage extends Vue {
    /**
     * How the cost is performed.
     */
    public costType: string = 'total';

    public updateCostTab(arg: string): void {
        this.costType = arg;
    }
}
</script>