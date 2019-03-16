import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';
import { VehicleMake } from '../entities/vehicle-make';
import { VehicleModel } from '../entities/vehicle-model';

/**
 * Service for retrieving, and updating vehicles from the back end.
 */
export class VehicleService extends Service {
    /**
     * Get a list of vehicles for a user.
     * @param user The user to get vehicles for.
     */
    public async getAllVehiclesForUser(user: User): Promise<Vehicle[]> {
        const apiResponse = await this._httpClient.get('/v1/vehicle', user.authToken);
        return apiResponse.data.map((v: any) => Vehicle.fromRaw(v));
    }

    /**
     * Add a new vehicle for the user.
     * @param user The user to add a vehicle for.
     * @param vehicle The vehicle to add.
     */
    public async addVehicle(user: User, vehicle: Vehicle): Promise<void> {
        const apiResponse = await this._httpClient.post('/v1/vehicle', vehicle, user.authToken);
        vehicle.id = apiResponse.data.id;
    }

    /**
     * Update a vehicle.
     * @param user The user to update it for.
     * @param vehicle The vehicle to update.
     */
    public async updateVehicle(user: User, vehicle: Vehicle): Promise<void> {
        await this._httpClient.patch(`/v1/vehicle/${vehicle.id}`, vehicle, user.authToken);
    }

    /**
     * Delete a vehicle for a user.
     * @param user The user to delete a vehicle for.
     * @param vehicle The vehicle to delete.
     */
    public async deleteVehicle(user: User, vehicle: Vehicle): Promise<void> {
        await this._httpClient.delete(`/v1/vehicle/${vehicle.id}`, user.authToken);
    }

    /**
     * Decode a vin to get the year, make, and model.
     * @param user The user to decode the vin for.
     * @param vin The vin to decode.
     */
    public async decodeVin(user: User, vin: string): Promise<{ year: number; make: VehicleMake; model: VehicleModel }> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/vin/${vin}`, user.authToken);
        const year = apiResponse.data.year;
        const make = VehicleMake.fromRaw(apiResponse.data.make);
        const model = VehicleModel.fromRaw(apiResponse.data.model);

        return { year, make, model };
    }
}
