import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { Vehicle } from '../entities/vehicle/vehicle';
import { VehicleProfilePicture } from '../entities/vehicle/vehicle-profile-picture';
import { Nullable } from '@/core/common/monads/nullable';

/**
 * Service for interacting with profile pictures for vehicles
 * from the backend.
 */
export class VehicleProfilePictureService extends Service {
    /**
     * Get the profile picture of a user's vehicle.
     * @param user The active user.
     * @param vehicle The vehicle to get it for.
     */
    public async getVehicleProfilePicture(user: User, vehicle: Vehicle): Promise<Nullable<VehicleProfilePicture>> {
        const result = await this._httpClient.get(`/v1/vehicle/${vehicle.id}/profile-picture`, user.authToken);

        return new VehicleProfilePicture(result.data.id, result.data.vehicleId, result.data.data, result.data.fileName, result.data.fileType);
    }

    /**
     * Upload a new profile picture for a vehicle.
     * @param user The user to upload it for.
     * @param vehicle The vehicle it belongs to.
     * @param picture The picture to upload.
     */
    public async uploadVehicleProfilePicture(user: User, vehicle: Vehicle, picture: VehicleProfilePicture) {
        await this._httpClient.post(`/v1/vehicle/${vehicle.id}/profile-picture`, picture, user.authToken);
    }

    /**
     * Delete an existing profile picture for a vehicle.
     * @param user The user to do it for.
     * @param vehicle The vehicle to delete it for.
     */
    public async deleteVehicleProfilePicture(user: User, vehicle: Vehicle) {
        await this._httpClient.delete(`/v1/vehicle/${vehicle.id}/profile-picture`, user.authToken);
    }
}
