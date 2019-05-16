
/**
 * A vehicle model code.
 */
export class VehicleModel {
    /**
     * The unique Id assigned by the backend.
     */
    public readonly id: number;

    /**
     * The Id of the parent brand that the model
     * belongs to.
     */
    public readonly makeId: number;

    /**
     * The name of the model.
     */
    public readonly name: string;

    /**
     * Create a new vehicle model code.
     * @param id The Unique Id of the model.
     * @param makeId The unique Id of the parent make.
     * @param name The name of the model.
     */
    constructor(id: number, makeId: number, name: string) {
        this.id = id;
        this.makeId = makeId;
        this.name = name;
    }

    /**
     * Rebuild a vehicle model from it's raw counterpart.
     * @param raw The raw vehicle make.
     */
    public static fromRaw(raw: any): VehicleModel {
        return new VehicleModel(raw.id, raw.makeId, raw.name);
    }
}
