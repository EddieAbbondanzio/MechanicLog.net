import { UnitSystem } from "@/vehicle-system/common/unit-system";
import { VehicleResource } from "@/vehicle-system/common/vehicle-resource";

/**
 * Settings for a vehicle.
 */
export class VehicleSettings implements VehicleResource {
    /**
     * The unique id of the settings.
     */
    public id!: number;

    /**
     * The parent vehicle record.
     */
    public vehicleId!: number;

    /**
     * The system used to measure with.
     */
    public unitSystem!: UnitSystem;

    /**
     * Rebuild the settings from their raw object.
     * @param raw The raw object to parse.
     */
    public static fromRaw(raw: any): VehicleSettings {
        const settings = new VehicleSettings();
        settings.id = raw;
        settings.vehicleId = raw.vehicleId;
        settings.unitSystem = raw.unitSystem;

        return settings;
    }
}
