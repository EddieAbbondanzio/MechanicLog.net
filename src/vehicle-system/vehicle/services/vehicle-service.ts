import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import { HttpResponse } from '@/core/http/http-response';
import { ServiceError } from '@/core/services/service-error';
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
    public async getAllVehiclesForUser(user: User): Promise<Either<Vehicle[], ServiceError>> {
        try {
            const response: HttpResponse = await this._httpClient.get('/vehicle', user.authToken);
            const vehicles: Vehicle[] = response.data.map((v: any) => Vehicle.fromRaw(v));

            return Either.left(vehicles);
        } catch (error) {
            return Either.right(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Add a new vehicle for the user.
     * @param user The user to add a vehicle for.
     * @param vehicle The vehicle to add.
     */
    public async addVehicle(user: User, vehicle: Vehicle): Promise<Maybe<ServiceError>> {
        try {
            const response: HttpResponse = await this._httpClient.post('/vehicle', vehicle, user.authToken);
            vehicle.id = response.data.id;
            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Update a vehicle.
     * @param user The user to update it for.
     * @param vehicle The vehicle to update.
     */
    public async updateVehicle(user: User, vehicle: Vehicle): Promise<Maybe<ServiceError>> {
        try {
            await this._httpClient.patch(`/vehicle/${vehicle.id}`, vehicle, user.authToken);
            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Delete a vehicle for a user.
     * @param user The user to delete a vehicle for.
     * @param vehicle The vehicle to delete.
     */
    public async deleteVehicle(user: User, vehicle: Vehicle): Promise<Maybe<ServiceError>> {
        try {
            await this._httpClient.delete(`/vehicle/${vehicle.id}`, user.authToken);
            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }
}
