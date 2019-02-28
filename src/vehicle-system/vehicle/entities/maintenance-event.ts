import { Mechanic } from '../../mechanic/entities/mechanic';
import { MaintenanceService } from './maintenance-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { MechanicService } from '@/vehicle-system/mechanic/services/mechanic-service';
import { ServiceType } from '@/core/services/service-type';
import { User } from '@/user-system/entities/user';
import { MechanicStore } from '@/vehicle-system/mechanic/mechanic-store';
import { Store } from '@/core/store/store';
import { Nullable } from '@/core/common/monads/nullable';
import { HttpError } from '@/core/http/service-error';
import { Either } from '@/core/common/monads/either';

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
     * @param mileage The mileage the event occured at.
     * @param date The date of the event.
     * @param mechanic The mechanic who performed it.
     * @param services The services performed.
     */
    constructor(mileage: number, date: Date, mechanic: Mechanic, services: MaintenanceService[] = []) {
        this.id = 0;
        this.userId = 0;
        this.vehicleId = 0;
        this.mileage = mileage;
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
    public static async fromRaw(raw: any): Promise<Either<MaintenanceEvent, HttpError>> {
        const mechanicStore: MechanicStore = Store.resolve<MechanicStore>('mechanic');
        const mechanic: Either<Nullable<Mechanic>, HttpError> = await mechanicStore.getMechanic(raw.mechanicId);

        // Error out
        if (mechanic.isRight()) {
            return Either.right(mechanic.getRight());
        }

        const services = [];

        // No async support for .map...
        for (const service of raw.services) {
            services.push(await MaintenanceService.fromRaw(service));
        }

        const event = new MaintenanceEvent(raw.mileage, new Date(raw.date), mechanic.getLeft()!, services);
        event.id = raw.id;
        event.userId = raw.userId;
        event.vehicleId = raw.vehicleId;
        event.totalCost = raw.totalCost;
        event.label = raw.label;

        return Either.left(event);
    }

    /**
     * Convert the event into an intermediate state that matches up with the backend.
     */
    public toJSON(): any {
        return {
            mileage: this.mileage,
            date: this.date,
            label: this.label,
            mechanicId: this.mechanic.id,
            vehicleId: this.vehicleId,
            services: this.services,
            totalCost: this.totalCost,
        };
    }
}
