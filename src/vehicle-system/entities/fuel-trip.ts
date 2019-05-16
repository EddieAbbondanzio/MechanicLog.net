import { Vehicle } from './vehicle/vehicle';
import { DateUtils } from '@/core/common/utils/date-utils';
import { VehicleResource } from '../common/vehicle-resource';

export class FuelTrip implements VehicleResource {
    /**
     * The unique id of the trip.
     */
    public id!: number;

    /**
     * The vehicle it belongs to.
     */
    public vehicleId!: number;

    /**
     * The date of the trip.
     */
    public date!: Date;

    /**
     * How much it cost per unit ($ per gallon, etc...)
     */
    public pricePerUnit!: number;

    /**
     * The number of fuel units (gallons) it used.
     */
    public fuelUnits!: number;

    /**
     * How many units (miles) the trip was.
     */
    public distanceTravelled!: number;

    /**
     * The fuel unts to distance travelled ratio. THink MPGs.
     */
    public fuelDistanceRatio!: number;

    /**
     * The total cost of the tank.
     */
    public cost!: number;

    /**
     * Create a new fuel trip.
     * @param vehicleId The ID of the vehicle it belongs to.
     * @param date The date it occured on.
     * @param pricePerUnit The price paid per fuel unit (gallon)
     * @param fuelUnits The number of units bought.
     * @param distanceTravelled The distance they travelled.
     */
    constructor(vehicleId: number, date: Date, pricePerUnit: number, fuelUnits: number, distanceTravelled: number) {
        this.vehicleId = vehicleId;
        this.date = date;
        this.pricePerUnit = pricePerUnit;
        this.fuelUnits = fuelUnits;
        this.distanceTravelled = distanceTravelled;
        this.fuelDistanceRatio = distanceTravelled / fuelUnits;
        this.cost = fuelUnits * pricePerUnit;
    }

    /**
     * Rebuild a fuel trip from it's raw variant.
     * @param raw The raw incoming object.
     */
    public static fromRaw(raw: any): FuelTrip {
        const trip = new FuelTrip(raw.vehicleId, DateUtils.parse(raw.date), raw.pricePerUnit, raw.fuelUnits, raw.distanceTravelled);
        trip.id = raw.id;
        trip.fuelDistanceRatio = raw.fuelDistanceRatio;
        trip.cost = raw.cost;

        return trip;
    }
}
