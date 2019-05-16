import { Service } from '@/core/services/service';
import { Vehicle } from '../entities/vehicle/vehicle';
import { Maintenance } from '../entities/maintenance/maintenance';
import { User } from '@/user-system/entities/user';

/**
 * Service for mananging maintenance records from the backend.
 */
export class MaintenanceService extends Service {
    /**
     * Get the maintenance crecords of a vehcile.
     * @param vehicle THe vehicle to get htem for.
     */
    public async getMaintenanceForVehicle(vehicle: Vehicle): Promise<Maintenance[]> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/${vehicle.id}/maintenance`, User.CURRENT!.authToken);
        return apiResponse.data.map((r: {}) => new Maintenance(r));
    }

    /**
     * Add a new maintenance record to the database
     * @param vehicle The vehicle to add it to.
     * @param maintenance THe maintenance to add.
     */
    public async addMantenanceForVehicle(vehicle: Vehicle, maintenance: Maintenance): Promise<void> {
        const apiResponse = await this._httpClient.post(`/v1/vehicle/${vehicle.id}/maintenance`, maintenance, User.CURRENT!.authToken);
        maintenance.id = apiResponse.data.id;
    }

    /**
     * Delete a maintenance record from the database.
     * @param maintenance The mainteannce record to delete.
     */
    public async deleteMaintenance(vehicle: Vehicle, maintenance: Maintenance): Promise<void> {
        await this._httpClient.delete(`/v1/vehicle/${vehicle.id}/maintenance/${maintenance.id}`, User.CURRENT!.authToken);
    }
}
