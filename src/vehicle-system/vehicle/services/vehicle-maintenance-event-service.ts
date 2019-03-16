import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { MaintenanceEvent } from '../entities/maintenance-event';
import { Either } from '@/core/common/monads/either';
import { Vehicle } from '../entities/vehicle';
import { MaintenanceEventStats } from '../entities/maintenance-event-stats';
/**
 * API service for getting services of vehicles.
 */
export class VehicleMaintenanceEventService extends Service {
    /**
     * Get all of the maintenance events for a vehicle.
     * @param user The user that own's the vhicle.
     * @param vehicle The vehicle to get all the services for.
     */
    public async getAllForVehicle(user: User, vehicle: Vehicle): Promise<MaintenanceEvent[]> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/${vehicle.id}/maintenance`, user.authToken);

        const events = await Promise.all(apiResponse.data.map((m: any) => MaintenanceEvent.fromRaw(m)));
        return (events as unknown) as MaintenanceEvent[];
    }

    /**
     * Get the month to date, and year to date cost of a vehicle.
     * @param user The active user.
     * @param vehicle The vehicle to get stats for.
     */
    public async getStatsForVehicle(user: User, vehicle: Vehicle): Promise<MaintenanceEventStats> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/${vehicle.id}/maintenance/stats`, user.authToken);
        return MaintenanceEventStats.fromRaw(apiResponse.data);
    }

    /**
     * Add a new event to the user's vehicle.
     * @param user The user that own's the vehicle.
     * @param vehicle The vehicle to add it to.
     * @param event The event to add.
     */
    public async addEventForVehicle(user: User, vehicle: Vehicle, event: MaintenanceEvent): Promise<void> {
        const apiResponse = await this._httpClient.post(`/v1/vehicle/${vehicle.id}/maintenance`, event, user.authToken);
        event.id = apiResponse.data.id;
    }

    /**
     * Delete an existing event from the vehicle.
     * @param user The user that own's the vehicle.
     * @param vehicle The vehicle.
     * @param event The event to delete.
     */
    public async deleteEventForVehicle(user: User, vehicle: Vehicle, event: MaintenanceEvent): Promise<void> {
        await this._httpClient.delete(`/v1/vehicle/${vehicle.id}/maintenance/${event.id}`, user.authToken);
    }
}
