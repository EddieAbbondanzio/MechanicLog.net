import { ApiService } from '@/core/services/api-service';
import { User } from '@/user-system/entities/user';
import { Vehicle } from '@/garage/entities/vehicle';
import { HttpResponse } from '@/core/http/http-response';

/**
 * Service for retrieving, and updating vehicles from the back end.
 */
export class VehicleService extends ApiService {

    /**
     * Get a list of vehicles for a user.
     * @param user The user to get vehicles for.
     */
    public async getAllVehiclesForUser(user: User): Promise<Vehicle[]> {
        try {
            const response: HttpResponse = await this._httpClient.get('/vehicle', user.authToken);
            const vehicles: Vehicle[] = response.data.map((v: any) => Vehicle.fromRaw(v));

            return vehicles;
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Get a vehicle by it's unique ID.
     * @param id The ID of the vehicle.
     */
    public async getVehicleByIdForUser(user: User, id: number): Promise<Vehicle> {
        try {
            const response: HttpResponse = await this._httpClient.get(`/vehicle/${id}`, user.authToken);
            return Vehicle.fromRaw(response.data);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Add a new vehicle for the user.
     * @param user The user to add a vehicle for.
     * @param vehicle The vehicle to add.
     */
    public async addVehicle(user: User, vehicle: Vehicle): Promise<void> {
        try {
            const response: HttpResponse = await this._httpClient.post('/vehicle', vehicle, user.authToken);
            vehicle.id = response.data.id;
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Delete a vehicle for a user.
     * @param user The user to delete a vehicle for.
     * @param vehicle The vehicle to delete.
     */
    public async deleteVehicle(user: User, vehicle: Vehicle): Promise<void> {
        try {
            await this._httpClient.delete(`/vehicle/${vehicle.id}`, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update a vehicle's nickname.
     * @param user The user to update it for.
     * @param vehicle The vehicle to update.
     * @param name The new name of the vehicle.
     */
    public async updateVehicleName(user: User, vehicle: Vehicle, name: string): Promise<void> {
        try {
            await this._httpClient.patch(`/vehicle/${vehicle.id}`, { name }, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update a vehicles year.
     * @param user The user to update it for.
     * @param vehicle The vehicle to update.
     * @param year The new year of the vehicle.
     */
    public async updateVehicleYear(user: User, vehicle: Vehicle, year: number): Promise<void> {
        try {
            await this._httpClient.patch(`/vehicle/${vehicle.id}`, { year }, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update a vehicles make.
     * @param user The user to update it for.
     * @param vehicle The vehicle to update.
     * @param make The new make of the vehicle.
     */
    public async updateVehicleMake(user: User, vehicle: Vehicle, make: string): Promise<void> {
        try {
            await this._httpClient.patch(`/vehicle/${vehicle.id}`, { make }, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update a vehicle's model.
     * @param user The user to update it for.
     * @param vehicle The vehicle to update.
     * @param model The new model of the vehicle.
     */
    public async updateVehicleModel(user: User, vehicle: Vehicle, model: string): Promise<void> {
        try {
            await this._httpClient.patch(`/vehicle/${vehicle.id}`, { model }, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update a vehicle's mileage.
     * @param user The user to update it for.
     * @param vehicle The vehicle to update.
     * @param mileage The new mileage of the vehicle.
     */
    public async updateMileage(user: User, vehicle: Vehicle, mileage: number): Promise<void> {
        try {
            await this._httpClient.patch(`/vehicle/${vehicle.id}`, { mileage }, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }
}
