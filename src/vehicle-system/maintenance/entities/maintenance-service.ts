
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
}
