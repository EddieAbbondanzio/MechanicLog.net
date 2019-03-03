import { Service } from '@/core/services/service';
import { VehicleMake } from '../entities/vehicle-make';
import { HttpError } from '@/core/http/service-error';
import { Either } from '@/core/common/monads/either';
import { User } from '@/user-system/entities/user';

/**
 * Service for retrieving vehicle makes from the backend.
 */
export class VehicleMakeService extends Service {
    /**
     * Get all the makes from the backend.
     * @param user The active user.
     */
    public async getAllMakes(user: User): Promise<Either<VehicleMake[], HttpError>> {
        const apiResponse = await this._httpClient.get('/v1/vehicle/make', user.authToken);

        if (apiResponse.isLeft()) {
            return Either.left(apiResponse.getLeft().data.map((make: any) => VehicleMake.fromRaw(make)));
        } else {
            return Either.right(apiResponse.getRight());
        }
    }

    /**
     * Get a specific make by it's ID.
     * @param user The active user.
     * @param id The Id of the make to get.
     */
    public async getMake(user: User, id: number): Promise<Either<VehicleMake, HttpError>> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/make/${id}`, user.authToken);

        if (apiResponse.isLeft()) {
            return Either.left(VehicleMake.fromRaw(apiResponse.getLeft().data));
        } else {
            return Either.right(apiResponse.getRight());
        }
    }
}
