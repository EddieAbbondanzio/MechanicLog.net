
/**
 * Service for a maintenance to describe an action that was performed.
 */
export class MaintenanceService {
    /**
     * The unique ID of the service.
     */
    public id: number;

    /**
     * The ID of the user that owns it.
     */
    public userId: number;

    /**
     * The ID of the event it belongs to.
     */
    public eventId: number;

    /**
     * The description of the service.
     */
    public description: string;

    /**
     * Create a new maintenance service.
     * @param description The service description.
     */
    constructor(description: string) {
        this.id = 0;
        this.userId = 0;
        this.eventId = 0;
        this.description = description;
    }

    /**
     * Rebuild the service from it's raw counterpart.
     * @param raw The raw object of the service.
     */
    public static async fromRaw(raw: any): Promise<MaintenanceService> {
        const s = new MaintenanceService(raw.description);
        s.userId = raw.userId;
        s.eventId = raw.eventId;
        return s;
    }
}
