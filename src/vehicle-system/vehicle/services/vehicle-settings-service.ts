import { VehicleSettings } from '../entities/vehicle-settings';
import { Vehicle } from '../entities/vehicle';
import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';

/**
 * Service for working with vehicle settings in the backend.
 */
export class VehicleSettingsService extends Service {
    /**
     * Get the settings for a vehicle.
     * @param vehicle The vehicle to get the settings of.
     */
    public async getVehicleSettings(vehicle: Vehicle): Promise<VehicleSettings> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/${vehicle.id}/settings`, User.CURRENT!.authToken);
        return VehicleSettings.fromRaw(apiResponse.data);
    }

    /**
     * Update the settings of a vehicle.
     * @param settings The settings to update.
     */
    public async updateVehicleSettings(settings: VehicleSettings): Promise<void> {
        await this._httpClient.patch(`/v1/vehicle/${settings.vehicleId}/settings/${settings.id}`, settings, User.CURRENT!.authToken);
    }
}
