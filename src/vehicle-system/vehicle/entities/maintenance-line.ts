import { MaintenanceLineType } from './maintenance-line-type';

/**
 * A line detailf oa a maintenance record.
 */
export class MaintenanceLine {
    /**
     * The unqiue ID of the maintenance line.
     */
    public id!: number;

    /**
     * The type of line it is.
     */
    public type!: MaintenanceLineType;

    /**
     * The amount of the line that was used. This can be hours,
     * or units.
     */
    public quantity!: number;

    /**
     * The part number, or service code.
     */
    public code!: string;

    /**
     * The cost of the line.
     */
    public cost!: number;

    /**
     * Create a new maintenance line.
     * @param options The options to assign to it.
     */
    constructor(options: Partial<MaintenanceLine> = {}) {
        Object.assign(this, options);
    }
}
