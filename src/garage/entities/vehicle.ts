
/**
 * A motor vehicle.
 */
export class Vehicle {
    /**
     * The unique ID of the vehicle.
     */
    public id: number;

    /**
     * The nickname of the car.
     */
    public name: string;

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
     * The last day maintenace was performed on it.
     */
    public lastMaintenaceDate?: Date;

    /**
     * Create a new vehicle.
     * @param name The nickname of the car.
     * @param year The model year of the car.
     * @param make The make of the car.
     * @param model The model of the car.
     * @param mileage The current mileage.
     */
    constructor(name: string, year: number, make: string, model: string, mileage: number) {
        this.id = 0;
        this.name = name;
        this.year = year;
        this.make = make;
        this.model = model;
        this.mileage = mileage;
    }

    /**
     * Rebuild a vehicle entity from it's raw object counterpart. Useful
     * for recreating them from API responses.
     * @param raw The raw object to pull the vehicle details from.
     */
    public static fromRaw(raw: any): Vehicle {
        const v: Vehicle = new Vehicle(raw.name, raw.year, raw.make, raw.model, raw.mileage);
        v.id = raw.id;

        return v;
    }
}
