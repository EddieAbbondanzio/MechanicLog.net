import { VehicleMake } from '../entities/vehicle-make';
import { VehicleModel } from '../entities/vehicle-model';
import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';

/**
 * API consumer for the backend to get vehicle models.
 */
export class VehicleModelService extends Service {
    /**
     * Get all the models for a vehicle make.
     * @param user The active user.
     * @param make The make to get models for.
     */
    public async getAllModelsForMake(user: User, make: VehicleMake): Promise<VehicleModel[]> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/make/${make.id}/model`, user.authToken);
        return apiResponse.data.map((model: any) => VehicleModel.fromRaw(model));
    }
}
