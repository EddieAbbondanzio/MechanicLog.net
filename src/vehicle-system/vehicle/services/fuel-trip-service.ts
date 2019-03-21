import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { FuelTrip } from '../entities/fuel-trip';
import { Vehicle } from '../entities/vehicle';
import { EventBus } from '@/core/event/event-bus';

/**
 * Service for retrieving fuel trips from the backend.
 */
export class FuelTripService extends Service {
    /**
     * Get all the fuel trips of a vehicle.
     * @param user The owner.
     * @param vehicle The vehicle to get all fuel trips for.
     */
    public async getFuelTrips(user: User, vehicle: Vehicle): Promise<FuelTrip[]> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/${vehicle.id}/fuel-trip`, user.authToken);
        return apiResponse.data.map((f: any) => FuelTrip.fromRaw(f));
    }

    /**
     * Add a fuel trip for a vehicle.
     * @param user The owner.
     * @param vehicle The vehicle it belongs to.
     * @param fuelTrip The fuel trip to add.
     */
    public async addFuelTrip(user: User, vehicle: Vehicle, fuelTrip: FuelTrip): Promise<void> {
        const apiResponse = await this._httpClient.post(`/v1/vehicle/${vehicle.id}/fuel-trip`, fuelTrip, user.authToken);
        fuelTrip.id = apiResponse.data.id;
    }

    /**
     * Update an existing fuel trip.
     * @param user The owner.
     * @param fuelTrip The fuel trip to update.
     */
    public async updateFuelTrip(user: User, fuelTrip: FuelTrip): Promise<void> {
        await this._httpClient.patch(`/v1/vehicle/${fuelTrip.vehicleId}/fuel-trip/${fuelTrip.id}`, fuelTrip, user.authToken);
    }

    /**
     * Delete a specific fuel trip for a user.
     * @param user The owner.
     * @param fuelTrip The fuel trip to delete.
     */
    public async deleteFuelTrip(user: User, fuelTrip: FuelTrip): Promise<void> {
        await this._httpClient.delete(`/v1/vehicle/${fuelTrip.vehicleId}/fuel-trip/${fuelTrip.id}`, user.authToken);
    }
}
