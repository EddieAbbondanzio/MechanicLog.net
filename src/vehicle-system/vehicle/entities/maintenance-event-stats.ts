
/**
 * Stats about how much the user has paid in maintenance for a vehicle.
 */
export class MaintenanceEventStats {
    /**
     * How much the user has spent in the past 30 days
     * on the vehicle.
     */
    public monthToDateCost: number;

    /**
     * How much the user has spent in the last year on
     * the vehicle.
     */
    public yearToDateCost: number;

    /**
     * Create a new maintenance event stats.
     * @param mtd The month to date cost.
     * @param ytd The year to date cost.
     */
    constructor(mtd: number, ytd: number) {
        this.monthToDateCost = mtd;
        this.yearToDateCost = ytd;
    }

    /**
     * Rebuild the stats from their raw counterpart.
     * @param raw The raw object to rebuild it from.
     */
    public static fromRaw(raw: any): MaintenanceEventStats {
        return new MaintenanceEventStats(raw.monthToDateCost, raw.yearToDateCost);
    }
}
