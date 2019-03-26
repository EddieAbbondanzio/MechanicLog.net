import { Mechanic } from '../../mechanic/entities/mechanic';
import { MaintenanceService } from './maintenance-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { MechanicService } from '@/vehicle-system/mechanic/services/mechanic-service';
import { ServiceType } from '@/core/services/service-type';
import { User } from '@/user-system/entities/user';
import { MechanicStore } from '@/vehicle-system/mechanic/mechanic-store';
import { Store } from '@/core/store/store';

/**
 * Maintenance event for a vehicle.
 */
export class MaintenanceEvent {
    /**
     * The unique ID of the event.
     */
    public id: number;

    /**
     * The id of the user that owns it.
     */
    public userId: number;

    /**
     * The ID of the vehicle it belongs to.
     */
    public vehicleId: number;

    /**
     * The mileage the event occured at.
     */
    public odometer: number;

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
     * The total cost of the service.
     */
    public totalCost: number;

    /**
     * The label of the event.
     */
    public label: string;

    /**
     * Create a new maintenance event.
     * @param id The ID of the event.
     * @param odometer The mileage the event occured at.
     * @param date The date of the event.
     * @param mechanic The mechanic who performed it.
     * @param services The services performed.
     */
    constructor(odometer: number, date: Date, mechanic: Mechanic, services: MaintenanceService[] = []) {
        this.id = 0;
        this.userId = 0;
        this.vehicleId = 0;
        this.odometer = odometer;
        this.date = date;
        this.mechanic = mechanic;
        this.services = services;
        this.totalCost = 0;
        this.label = '';
    }

    /**
     * Rebuild the maintenance event from it's raw object.
     * @param raw The raw object to rebuild it from.
     */
    public static async fromRaw(raw: any): Promise<MaintenanceEvent> {
        const mechanicStore: MechanicStore = Store.resolve<MechanicStore>('mechanic');
        const mechanic = await mechanicStore.getMechanic(raw.mechanicId);

        const services = [];

        // No async support for .map...
        for (const service of raw.services) {
            services.push(await MaintenanceService.fromRaw(service));
        }

        const event = new MaintenanceEvent(raw.odometer, new Date(raw.date), mechanic!, services);
        event.id = raw.id;
        event.userId = raw.userId;
        event.vehicleId = raw.vehicleId;
        event.totalCost = raw.totalCost;
        event.label = raw.label;

        return event;
    }

    /**
     * Convert the event into an intermediate state that matches up with the backend.
     */
    public toJSON(): any {
        return {
            odometer: this.odometer,
            date: this.date,
            label: this.label,
            mechanicId: this.mechanic.id,
            vehicleId: this.vehicleId,
            services: this.services,
            totalCost: this.totalCost,
        };
    }
}
