import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import { HttpResponse } from '@/core/http/http-response';
import { HttpError } from '@/core/http/service-error';
import { Either } from '@/core/common/monads/either';
import { Maybe } from '@/core/common/monads/maybe';

/**
 * Service for retrieving, and updating vehicles from the back end.
 */
export class VehicleService extends Service {
    /**
     * Get a list of vehicles for a user.
     * @param user The user to get vehicles for.
     */
    public async getAllVehiclesForUser(user: User): Promise<Either<Vehicle[], HttpError>> {
        const apiResponse = await this._httpClient.get('/v1/vehicle', user.authToken);

        if (apiResponse.isLeft()) {
            return Either.left(apiResponse.getLeft().data.map((v: any) => Vehicle.fromRaw(v)));
        } else {
            return Either.right(apiResponse.getRight());
        }
    }

    /**
     * Add a new vehicle for the user.
     * @param user The user to add a vehicle for.
     * @param vehicle The vehicle to add.
     */
    public async addVehicle(user: User, vehicle: Vehicle): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.post('/v1/vehicle', vehicle, user.authToken);

        if (apiResponse.isLeft()) {
            vehicle.id = apiResponse.getLeft().data.id;
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }

    /**
     * Update a vehicle.
     * @param user The user to update it for.
     * @param vehicle The vehicle to update.
     */
    public async updateVehicle(user: User, vehicle: Vehicle): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.patch(`/v1/vehicle/${vehicle.id}`, vehicle, user.authToken);

        if (apiResponse.isLeft()) {
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }

    /**
     * Delete a vehicle for a user.
     * @param user The user to delete a vehicle for.
     * @param vehicle The vehicle to delete.
     */
    public async deleteVehicle(user: User, vehicle: Vehicle): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.delete(`/v1/vehicle/${vehicle.id}`, user.authToken);

        if (apiResponse.isLeft()) {
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }
}
