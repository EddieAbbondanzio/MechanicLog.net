import { ApiService } from "@/core/services/api-service";
import { User } from "@/user-system/entities/user";
import { Vehicle } from "@/vehicle-system/vehicle/entities/vehicle";
import { HttpResponse } from "@/core/http/http-response";
import { Nullable } from "@/core/common/monads/nullable";

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
            const response: HttpResponse = await this._httpClient.get(
                "/vehicle",
                user.authToken
            );
            const vehicles: Vehicle[] = response.data.map((v: any) =>
                Vehicle.fromRaw(v)
            );

            return vehicles;
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Get a vehicle by it's unique ID.
     * @param id The ID of the vehicle.
     */
    public async getVehicleByIdForUser(
        user: User,
        id: number
    ): Promise<Nullable<Vehicle>> {
        try {
            const response: HttpResponse = await this._httpClient.get(
                `/vehicle/${id}`,
                user.authToken
            );
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
            const response: HttpResponse = await this._httpClient.post(
                "/vehicle",
                vehicle,
                user.authToken
            );
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
            await this._httpClient.delete(
                `/vehicle/${vehicle.id}`,
                user.authToken
            );
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update a vehicle.
     * @param user The user to update it for.
     * @param vehicle The vehicle to update.
     */
    public async updateVehicle(user: User, vehicle: Vehicle): Promise<void> {
        try {
            await this._httpClient.patch(
                `/vehicle/${vehicle.id}`,
                vehicle,
                user.authToken
            );
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }
}
