
/**
 * A motor vehicle.
 */
export class Vehicle {
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
     * Create a new vehicle.
     * @param name The nickname of the car.
     * @param year The model year of the car.
     * @param make The make of the car.
     * @param model The model of the car.
     * @param mileage The current mileage.
     */
    constructor(name: string, year: number, make: string, model: string, mileage: number) {
        this.name = name;
        this.year = year;
        this.make = make;
        this.model = model;
        this.mileage = mileage;
    }
}
