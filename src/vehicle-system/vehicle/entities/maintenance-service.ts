
/**
 * Service for a maintenance to describe an action that was performed.
 */
export class MaintenanceService {
    /**
     * The unique ID of the service.
     */
    public id: number;

    /**
     * The description of the service.
     */
    public description: string;

    /**
     * Create a new maintenance service.
     * @param id The ID of the service.
     * @param description The service description.
     */
    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
    }

    /**
     * Rebuild the service from it's raw counterpart.
     * @param raw The raw object of the service.
     */
    public static async fromRaw(raw: any): Promise<MaintenanceService> {
        return new MaintenanceService(raw.id, raw.description);
    }
}
