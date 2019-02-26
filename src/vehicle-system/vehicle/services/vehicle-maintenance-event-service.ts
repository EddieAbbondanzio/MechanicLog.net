import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { MaintenanceEvent } from '../entities/maintenance-event';
import { Either } from '@/core/common/monads/either';
import { Vehicle } from '../entities/vehicle';
import { Maybe } from '@/core/common/monads/maybe';
import { HttpResponse } from '@/core/http/http-response';
import { ServiceError } from '@/core/services/service-error';
/**
 * API service for getting services of vehicles.
 */
export class VehicleMaintenanceEventService extends Service {
    /**
     * Get all of the maintenance events for a vehicle.
     * @param user The user that own's the vhicle.
     * @param vehicle The vehicle to get all the services for.
     */
    public async getAllForVehicle(user: User, vehicle: Vehicle): Promise<Either<MaintenanceEvent[], ServiceError>> {
        try {
            const response: HttpResponse = await this._httpClient.get(`/vehicle/${vehicle.id}/maintenance`, user.authToken);

            const events: MaintenanceEvent[] = [];

            for (const raw of response.data) {
                const event = await MaintenanceEvent.fromRaw(raw);

                if (event.isRight()) {
                    return Either.right(event.getRight());
                }

                events.push(event.getLeft());
            }

            return Either.left(events);
        } catch (error) {
            return Either.right(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Add a new event to the user's vehicle.
     * @param user The user that own's the vehicle.
     * @param vehicle The vehicle to add it to.
     * @param event The event to add.
     */
    public async addEventForVehicle(user: User, vehicle: Vehicle, event: MaintenanceEvent): Promise<Maybe<ServiceError>> {
        try {
            const response: HttpResponse = await this._httpClient.post(`/vehicle/${vehicle.id}/maintenance`, event, user.authToken);
            event.id = response.data.id;
            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Delete an existing event from the vehicle.
     * @param user The user that own's the vehicle.
     * @param vehicle The vehicle.
     * @param event The event to delete.
     */
    public async deleteEventForVehicle(user: User, vehicle: Vehicle, event: MaintenanceEvent): Promise<Maybe<ServiceError>> {
        try {
            await this._httpClient.delete(`/vehicle/${vehicle.id}/maintenance/${event.id}`, user.authToken);
            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }
}
