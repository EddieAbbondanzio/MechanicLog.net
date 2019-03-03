import { VehicleMake } from '../entities/vehicle-make';
import { VehicleModel } from '../entities/vehicle-model';
import { HttpError } from '@/core/http/service-error';
import { Either } from '@/core/common/monads/either';
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
    public async getAllModelsForMake(user: User, make: VehicleMake): Promise<Either<VehicleModel[], HttpError>> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/make/${make.id}/model`, user.authToken);

        if (apiResponse.isRight()) {
            return Either.right(apiResponse.getRight());
        } else {
            return Either.left(apiResponse.getLeft().data.map((model: any) => VehicleModel.fromRaw(model)));
        }
    }
}
