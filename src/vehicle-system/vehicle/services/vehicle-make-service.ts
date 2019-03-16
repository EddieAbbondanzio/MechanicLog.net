import { Service } from '@/core/services/service';
import { VehicleMake } from '../entities/vehicle-make';
import { User } from '@/user-system/entities/user';

/**
 * Service for retrieving vehicle makes from the backend.
 */
export class VehicleMakeService extends Service {
    /**
     * Get all the makes from the backend.
     * @param user The active user.
     */
    public async getAllMakes(user: User): Promise<VehicleMake[]> {
        const apiResponse = await this._httpClient.get('/v1/vehicle/make', user.authToken);
        return apiResponse.data.map((make: any) => VehicleMake.fromRaw(make));
    }

    /**
     * Get a specific make by it's ID.
     * @param user The active user.
     * @param id The Id of the make to get.
     */
    public async getMake(user: User, id: number): Promise<VehicleMake> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/make/${id}`, user.authToken);
        return VehicleMake.fromRaw(apiResponse.data);
    }
}
