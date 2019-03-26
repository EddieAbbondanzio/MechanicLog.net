import { UnitSystem } from '@/vehicle-system/common/unit-system';

/**
 * Settings for a vehicle.
 */
export class VehicleSettings {
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
}
