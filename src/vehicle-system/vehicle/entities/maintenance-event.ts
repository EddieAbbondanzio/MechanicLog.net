import { Mechanic } from '../../mechanic/entities/mechanic';
import { MaintenanceService } from './maintenance-service';

/**
 * Maintenance event for a vehicle.
 */
export class MaintenanceEvent {
    /**
     * The unique ID of the event.
     */
    public id: number;

    /**
     * The mileage the event occured at.
     */
    public mileage: number;

    /**
     * The date of the service.
     */
    public date: Date;

    /**
     * The mechanic who performed the action.
     */
    public mechanic: Mechanic;

    /**
     * The services of the event.
     */
    public services: MaintenanceService[];

    /**
     * Create a new maintenance event.
     * @param id The ID of the event.
     * @param mileage The mileage the event occured at.
     * @param date The date of the event.
     * @param mechanic The mechanic who performed it.
     * @param services The services performed.
     */
    constructor(id: number, mileage: number, date: Date, mechanic: Mechanic, services: MaintenanceService[] = []) {
        this.id = id;
        this.mileage = mileage;
        this.date = date;
        this.mechanic = mechanic;
        this.services = services;
    }
}
