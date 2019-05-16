import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { Vehicle } from '../entities/vehicle/vehicle';
import { Either } from '@/core/common/monads/either';
import { Maybe } from '@/core/common/monads/maybe';
import { User } from '@/user-system/entities/user';
import { VehicleService } from '../services/vehicle-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { Nullable } from '@/core/common/monads/nullable';
import { Dictionary } from '@/core/common/dictionary';
import { UnitSystem } from '@/vehicle-system/common/unit-system';

/**
 * Store for vehicles of the user.
 */
export class VehicleStore extends StoreModule {
    /**
     * The namespace of the store.
     */
    public readonly namespace: StoreModuleNamespace = 'vehicle';

    /**
     * The underlying vehicle service to the backend.
     */
    private _vehicleService: VehicleService;

    /**
     * Cache of vehicles from the backend.
     */
    private _vehicleCache: Nullable<Vehicle[]>;

    /**
     * Create a new vehicle store.
     */
    constructor() {
        super();
        this._vehicleService = ServiceRegistry.resolve('vehicle');
        this._vehicleCache = null;
    }

    public async getVehicle(id: number): Promise<Nullable<Vehicle>> {
        const vehicles = await this.getVehicles();
        return vehicles.find((v) => v.id === id) || null;
    }

    /**
     * Get all the vehicles of the user.
     */
    public async getVehicles(): Promise<Vehicle[]> {
        if (this._vehicleCache == null) {
            this._vehicleCache = await this._vehicleService.getAllVehiclesForUser(User.CURRENT!);
        }

        return this._vehicleCache;
    }

    /**
     * Add a new vehicle for the user to the backend.
     * @param vehicle the vehicle to add.
     */
    public async addVehicle(vehicle: Vehicle): Promise<void> {
        const apiResponse = await this._vehicleService.addVehicle(User.CURRENT!, vehicle);

        // Update the local cache
        this._vehicleCache!.push(vehicle);
    }

    /**
     * Update an existing vehicle with the backend.
     * @param vehicle The vehicle to update.
     */
    public async updateVehicle(vehicle: Vehicle): Promise<void> {
        const apiResponse = await this._vehicleService.updateVehicle(User.CURRENT!, vehicle);

        // Update the local cache
        const index: number = this._vehicleCache!.findIndex((v) => v.id === vehicle.id);
        if (index !== -1) {
            this._vehicleCache![index] = vehicle;
        }
    }

    /**
     * Delete an existing vehicle with the backend.
     * @param vehicle The vehicle to delete.
     */
    public async deleteVehicle(vehicle: Vehicle): Promise<void> {
        const apiResponse = await this._vehicleService.deleteVehicle(User.CURRENT!, vehicle);

        // Update the local cache
        const index: number = this._vehicleCache!.findIndex((v) => v.id === vehicle.id);
        if (index !== -1) {
            this._vehicleCache!.splice(index, 1);
        }
    }
}
