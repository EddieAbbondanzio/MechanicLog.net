/**
 * Tags that can be applied to maintenance events to categorize them.
 */
export class MaintenanceTag {
    /**
     * Unique ID of the tag.
     */
    public id!: number;

    /**
     * The text description of the tag.
     */
    public description!: string;

    /**
     * Create a new maintenance tag.
     * @param options The optional properties.
     */
    constructor(options: Partial<MaintenanceTag> = {}) {
        Object.assign(this, options);
    }
}
