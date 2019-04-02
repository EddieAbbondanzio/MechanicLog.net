import { VehicleMake } from './vehicle-make';
import { VehicleModel } from './vehicle-model';
import { Nullable } from '@/core/common/monads/nullable';
import { TransmissionType } from './transmission-type';

/**
 * A motor vehicle.
 */
export class Vehicle {
    public static MIN_MODEL_YEAR = 1900;
    public static MAX_MODEL_YEAR = new Date().getFullYear() + 1;
    public static MAX_LICENSE_PLATE_LENGTH = 10;
    public static MAX_VIN_LENGTH = 10;

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
    public make: VehicleMake;

    /**
     * The model of the car.
     */
    public model: VehicleModel;

    /**
     * How many miles the car has on it.
     */
    public odometer: number;

    /**
     * The nickname of the car.
     */
    public name: Nullable<string>;

    /**
     * The paint color.
     */
    public color: Nullable<string>;

    /**
     * The license plate number.
     */
    public licensePlate: Nullable<string>;

    /**
     * The VIN of the vehicle.
     */
    public vin: Nullable<string>;

    /**
     * The type of transmission it has.
     */
    public transmissionType: TransmissionType;

    /**
     * Create a new vehicle.
     * @param name The nickname of the car.
     * @param year The model year of the car.
     * @param make The make of the car.
     * @param model The model of the car.
     * @param odometer The current mileage.
     */
    constructor(year: number, make: VehicleMake, model: VehicleModel, odometer: number, transmissionType: TransmissionType) {
        this.id = 0;
        this.year = year;
        this.make = make;
        this.model = model;
        this.odometer = odometer;
        this.name = null;
        this.licensePlate = null;
        this.color = null;
        this.vin = null;
        this.transmissionType = transmissionType;
    }

    /**
     * Convert the vehicle into a JSON friendly object.
     */
    public toJSON(): {} {
        return {
            id: this.id,
            year: this.year,
            make: this.make.id,
            model: this.model.id,
            name: this.name,
            vin: this.vin,
            licensePlate: this.licensePlate,
            odometer: this.odometer,
            color: this.color,
            transmissionType: this.transmissionType,
        };
    }

    /**
     * Convert the vehicle into a print friendly string.
     */
    public toString(): string {
        return `${this.year} ${this.make.name} ${this.model.name}`;
    }

    /**
     * Rebuild a vehicle entity from it's raw object counterpart. Useful
     * for recreating them from API responses.
     * @param raw The raw object to pull the vehicle details from.
     */
    public static fromRaw(raw: any): Vehicle {
        const make = VehicleMake.fromRaw(raw.make);
        const model = VehicleModel.fromRaw(raw.model);

        const v: Vehicle = new Vehicle(raw.year, make, model, raw.odometer, raw.transmissionType);
        v.id = raw.id;
        v.name = raw.name;
        v.color = raw.color;
        v.licensePlate = raw.licensePlate;
        v.vin = raw.vin;

        return v;
    }

    /**
     * Rebuild a vehicle from it's raw input object form.
     * @param input The raw input object.
     */
    public static fromInput(input: any): Vehicle {
        const v: Vehicle = new Vehicle(input.year, input.make, input.model, input.odometer, input.transmissionType);
        v.name = input.name !== '' ? input.name : null;
        v.color = input.color !== '' ? input.color : null;
        v.licensePlate = input.licensePlate !== '' ? input.licensePlate : null;
        v.vin = input.vin !== '' ? input.vin : null;

        return v;
    }
}
