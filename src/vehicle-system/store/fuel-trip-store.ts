import { StoreModule } from '@/core/store/store-module';

import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { FuelTripService } from '../services/fuel-trip-service';
import { Dictionary } from 'vue-router/types/router';
import { Nullable } from '@/core/common/monads/nullable';
import { FuelTrip } from '../entities/fuel-trip';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { Vehicle } from '../entities/vehicle/vehicle';
import { User } from '@/user-system/entities/user';

/**
 * Store module for managing and caching fuel trips.
 */
export class FuelTripStore extends StoreModule {
    public readonly namespace: StoreModuleNamespace = 'fuelTrip';

    /**
     * Service for interacting with the backend.
     */
    private _service: FuelTripService;

    /**
     * Cache of fuel trips by vehicle.
     */
    private _cache: Dictionary<Nullable<FuelTrip[]>>;

    constructor() {
        super();
        this._service = ServiceRegistry.resolve('fuelTrip');
        this._cache = {};
    }

    /**
     * Get every fuel trip for a specific vehicle.
     * @param vehicle The vehicle to get all fuel trips for.
     */
    public async getFuelTrips(vehicle: Vehicle): Promise<FuelTrip[]> {
        if (this._cache[vehicle.id] == null) {
            this._cache[vehicle.id] = await this._service.getFuelTrips(User.CURRENT!, vehicle);
        }

        return this._cache[vehicle.id]!;
    }

    /**
     * Add a fuel trip for a vehicle.
     * @param vehicle The vehicle to add it under.
     * @param fuelTrip Add a new fuel trip to a vehicle.
     */
    public async addFuelTrip(vehicle: Vehicle, fuelTrip: FuelTrip): Promise<void> {
        await this._service.addFuelTrip(User.CURRENT!, vehicle, fuelTrip);

        if (this._cache[vehicle.id] == null) {
            throw new Error('Cannot add a fuel trip if they have not yet been retreieved');
        }

        this._cache[vehicle.id]!.push(fuelTrip);
        this._cache[vehicle.id]!.sort((a: FuelTrip, b: FuelTrip) => (a.date > b.date ? 1 : 0));
    }

    /**
     * Update a specific fuel trip.
     * @param fuelTrip The fuel trip to update.
     */
    public async updateFuelTrip(fuelTrip: FuelTrip): Promise<void> {
        await this._service.updateFuelTrip(User.CURRENT!, fuelTrip);
        const cacheIndex = this._cache[fuelTrip.vehicleId]!.findIndex((ft) => ft.id === fuelTrip.id);

        if (cacheIndex === -1) {
            throw new Error('Cannot update fuel trip if it does not exist');
        }

        this._cache[fuelTrip.vehicleId]![cacheIndex] = fuelTrip;
    }

    /**
     * Delete a fuel trip from the database.
     * @param fuelTrip The fuel trip to delete.
     */
    public async deleteFuelTrip(fuelTrip: FuelTrip): Promise<void> {
        await this._service.deleteFuelTrip(User.CURRENT!, fuelTrip);

        if (this._cache[fuelTrip.vehicleId] == null) {
            throw new Error('No cached fuel trips found. Cannot delete it.');
        }

        const cacheIndex = this._cache[fuelTrip.vehicleId]!.findIndex((ft) => ft.id === fuelTrip.id);

        if (cacheIndex === -1) {
            throw new Error('Cannot update fuel trip if it does not exist');
        }

        this._cache[fuelTrip.vehicleId]!.splice(cacheIndex, 1);
    }
}
