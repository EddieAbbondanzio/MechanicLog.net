import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { Vehicle } from '../entities/vehicle';
import { HttpError } from '@/core/http/service-error';
import { Either } from '@/core/common/monads/either';
import { Maybe } from '@/core/common/monads/maybe';
import { User } from '@/user-system/entities/user';
import { VehicleService } from '../services/vehicle-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { Nullable } from '@/core/common/monads/nullable';
import { VehicleMaintenanceEventService } from '../services/vehicle-maintenance-event-service';
import { MaintenanceEvent } from '../entities/maintenance-event';
import { MaintenanceEventStats } from '../entities/maintenance-event-stats';
import { Dictionary } from '@/core/common/dictionary';

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
     * The underlying maintenance service to the backend.
     */
    private _maintenanceService: VehicleMaintenanceEventService;

    /**
     * Cache of vehicles from the backend.
     */
    private _vehicleCache: Nullable<Vehicle[]>;

    private _statsCache: Dictionary<Nullable<MaintenanceEventStats>>;

    /**
     * Create a new vehicle store.
     */
    constructor() {
        super();
        this._vehicleService = ServiceRegistry.resolve(ServiceType.Vehicle);
        this._maintenanceService = ServiceRegistry.resolve(ServiceType.MaintenanceEvent);
        this._vehicleCache = null;
        this._statsCache = {};
    }

    public async getVehicle(id: number): Promise<Either<Nullable<Vehicle>, HttpError>> {
        const vehicles = await this.getVehicles();

        if (vehicles.isRight()) {
            return Either.right(vehicles.getRight());
        } else {
            return Either.left(vehicles.getLeft().find((v) => v.id === id) || null);
        }
    }

    /**
     * Get all the vehicles of the user.
     */
    public async getVehicles(): Promise<Either<Vehicle[], HttpError>> {
        if (this._vehicleCache == null) {
            const apiResponse = await this._vehicleService.getAllVehiclesForUser(User.CURRENT!);

            // If we got back good data, return it to the user.
            if (apiResponse.isLeft()) {
                this._vehicleCache = apiResponse.getLeft();
            } else {
                return apiResponse;
            }
        }

        return Either.left(this._vehicleCache);
    }

    /**
     * Add a new vehicle for the user to the backend.
     * @param vehicle the vehicle to add.
     */
    public async addVehicle(vehicle: Vehicle): Promise<Maybe<HttpError>> {
        const apiResponse = await this._vehicleService.addVehicle(User.CURRENT!, vehicle);

        // Errored out.
        if (apiResponse.hasSome()) {
            return apiResponse;
        }

        // Update the local cache
        this._vehicleCache!.push(vehicle);
        return Maybe.none();
    }

    /**
     * Update an existing vehicle with the backend.
     * @param vehicle The vehicle to update.
     */
    public async updateVehicle(vehicle: Vehicle): Promise<Maybe<HttpError>> {
        const apiResponse = await this._vehicleService.updateVehicle(User.CURRENT!, vehicle);

        // Errored out.
        if (apiResponse.hasSome()) {
            return apiResponse;
        }

        // Update the local cache
        const index: number = this._vehicleCache!.findIndex((v) => v.id === vehicle.id);
        if (index !== -1) {
            this._vehicleCache![index] = vehicle;
        }

        return Maybe.none();
    }

    /**
     * Delete an existing vehicle with the backend.
     * @param vehicle The vehicle to delete.
     */
    public async deleteVehicle(vehicle: Vehicle): Promise<Maybe<HttpError>> {
        const apiResponse = await this._vehicleService.deleteVehicle(User.CURRENT!, vehicle);

        // Errored out.
        if (apiResponse.hasSome()) {
            return apiResponse;
        }

        // Update the local cache
        const index: number = this._vehicleCache!.findIndex((v) => v.id === vehicle.id);
        if (index !== -1) {
            this._vehicleCache!.splice(index, 1);
        }

        return Maybe.none();
    }

    /**
     * Get all the maintenance events for a vehicle.
     * @param vehicle The vehicle to get all the service events for.
     */
    public async getMaintenanceEvents(vehicle: Vehicle): Promise<Either<MaintenanceEvent[], HttpError>> {
        return this._maintenanceService.getAllForVehicle(User.CURRENT!, vehicle);
    }

    /**
     * Get the year to date, and month to date cost of a vehicle.
     * @param vehicle The vehicle to get stats for.
     */
    public async getMaintenanceEventStats(vehicle: Vehicle): Promise<Either<MaintenanceEventStats, HttpError>> {
        // Did we already cache it?
        if (this._statsCache[vehicle.id] != null) {
            return Either.left(this._statsCache[vehicle.id]!);
        }

        const result = await this._maintenanceService.getStatsForVehicle(User.CURRENT!, vehicle);

        // Cache it if needed.
        if (result.isLeft()) {
            this._statsCache[vehicle.id] = result.getLeft();
        }

        return result;
    }

    /**
     * Add a maintenance event to a vehicle.
     * @param vehicle The vehicle to add it to.
     * @param event The event to add.
     */
    public async addMaintenanceEvent(vehicle: Vehicle, event: MaintenanceEvent): Promise<Maybe<HttpError>> {
        // Clear it from cache if needed.
        if (this._statsCache[vehicle.id] != null) {
            this._statsCache[vehicle.id] = null;
        }

        return this._maintenanceService.addEventForVehicle(User.CURRENT!, vehicle, event);
    }

    /**
     * Delete an event from a vehicle.
     * @param vehicle The vehicle to delete it from.
     * @param event The event to delete.
     */
    public async deleteMaintenanceEvent(vehicle: Vehicle, event: MaintenanceEvent): Promise<Maybe<HttpError>> {
        // Clear it from cache if needed.
        if (this._statsCache[vehicle.id] != null) {
            this._statsCache[vehicle.id] = null;
        }

        return this._maintenanceService.deleteEventForVehicle(User.CURRENT!, vehicle, event);
    }
}
