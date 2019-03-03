
/**
 * A vehicle manafacturer code.
 */
export class VehicleMake {
    /**
     * The unique Id assigned by the backend.
     */
    public readonly id: number;

    /**
     * The name of the manafacturer.
     */
    public readonly name: string;

    /**
     * Create a new vehicle manafacturer.
     * @param id The Id of the make.
     * @param name The name of the make.
     */
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    /**
     * Rebuild a vehicle make from it's raw counterpart.
     * @param raw The raw object to pull the vehicle details from/
     */
    public static fromRaw(raw: any): VehicleMake {
        return new VehicleMake(raw.id, raw.name);
    }
}
