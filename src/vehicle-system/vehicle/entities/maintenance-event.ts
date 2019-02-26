import { Mechanic } from '../../mechanic/entities/mechanic';
import { MaintenanceService } from './maintenance-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { MechanicService } from '@/vehicle-system/mechanic/services/mechanic-service';
import { ServiceType } from '@/core/services/service-type';
import { User } from '@/user-system/entities/user';

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

    /**
     * Rebuild the maintenance event from it's raw object.
     * @param raw The raw object to rebuild it from.
     */
    public static async fromRaw(raw: any): Promise<MaintenanceEvent> {
        // Don't really agree with this, but no better choices right now.
        const mechService = ServiceRegistry.resolve<MechanicService>(ServiceType.Mechanic);
        const mechanic = await mechService.getMechanicById(User.CURRENT!, raw.mechanicId);

        if (mechanic.isRight()) {
            throw new Error('UH OH');
        }

        const services = await raw.services.map((s: MaintenanceService) => MaintenanceService.fromRaw(s));
        return new MaintenanceEvent(raw.id, raw.mileage, raw.date, mechanic.getLeft(), services);
    }
}
