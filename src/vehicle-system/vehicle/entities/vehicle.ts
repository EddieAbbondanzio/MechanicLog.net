import { MaintenanceEvent } from './maintenance-event';

/**
 * A motor vehicle.
 */
export class Vehicle {
    /**
     * The unique ID of the vehicle.
     */
    public id: number;

    /**
     * The model year of the car.
     */
    public year: number;

    /**
     * The make of the car.
     */
    public make: string;

    /**
     * The model of the car.
     */
    public model: string;

    /**
     * How many miles the car has on it.
     */
    public mileage: number;

    /**
     * The nickname of the car.
     */
    public name?: string;

    /**
     * The paint color.
     */
    public color?: string;

    /**
     * The license plate number.
     */
    public licensePlate?: string;

    /**
     * The VIN of the vehicle.
     */
    public vin?: string;

    /**
     * The maintenance history of the vehicle.
     */
    public maintenance: MaintenanceEvent[];

    /**
     * Create a new vehicle.
     * @param name The nickname of the car.
     * @param year The model year of the car.
     * @param make The make of the car.
     * @param model The model of the car.
     * @param mileage The current mileage.
     */
    constructor(year: number, make: string, model: string, mileage: number) {
        this.id = 0;
        this.year = year;
        this.make = make;
        this.model = model;
        this.mileage = mileage;
        this.maintenance = [];
    }

    /**
     * Convert the vehicle into a print friendly string.
     */
    public toString(): string {
        if (this.name != null) {
            return `${this.name} - ${this.year} ${this.make} ${this.model}`;
        } else {
            return `${this.year} ${this.make} ${this.model}`;
        }
    }

    /**
     * Rebuild a vehicle entity from it's raw object counterpart. Useful
     * for recreating them from API responses.
     * @param raw The raw object to pull the vehicle details from.
     */
    public static fromRaw(raw: any): Vehicle {
        const v: Vehicle = new Vehicle(raw.year, raw.make, raw.model, raw.mileage);
        v.id = raw.id;
        v.name = raw.name;
        v.color = raw.color;
        v.licensePlate = raw.licensePlate;
        v.vin = raw.vin;

        return v;
    }
}
