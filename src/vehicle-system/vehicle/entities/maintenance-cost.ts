import { MaintenanceCostCalculationMethod } from './maintenance-cost-calculation-method';

/**
 * Entity to hold the cost data of a maintenance event.
 */
export class MaintenanceCost {
    /**
     * The unqiue ID.
     */
    public id!: number;

    /**
     * The cost of labour paid.
     */
    public laborCost!: number;

    /**
     * The cost of labour paid.
     */
    public partsCost!: number;

    /**
     * The cost of labour paid.
     */
    public otherCost!: number;

    /**
     * How the cost were calculated.
     */
    public calculationMethod!: MaintenanceCostCalculationMethod;

    /**
     * Create a new maintenance cost.
     * @param opts The optional paramteres.
     */
    constructor(opts: Partial<MaintenanceCost> = {}) {
        Object.assign(this, opts);
    }
}
