import { StoreModule } from '@/core/store/store-module';
import { MaintenanceTagService } from '../services/maintenance-tag-service';
import { MaintenanceTag } from '../entities/maintenance-tag';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { Nullable } from '@/core/common/monads/nullable';
import { MaintenanceService } from '../services/maintenance-service';
import { Vehicle } from '../entities/vehicle';
import { Dictionary } from 'vue-router/types/router';
import { Maintenance } from '../entities/maintenance';

/**
 * Store for everything related to maintenance
 */
export class MaintenanceStore extends StoreModule {
    public readonly namespace = 'maintenance';

    /**
     * Service for getting maintenance tags.
     */
    private _maintenanceTagService: MaintenanceTagService;

    /**
     * Service for getting maintenance records.
     */
    private _maintenanceService: MaintenanceService;

    /**
     * The cache of maintenance tags.
     */
    private _maintenanceTagCache: Nullable<MaintenanceTag[]>;

    private _maintenanceCache: Dictionary<Nullable<Maintenance[]>>;

    /**
     * Create a new maintenance store.
     */
    constructor() {
        super();

        this._maintenanceService = ServiceRegistry.resolve(ServiceType.Maintenance);
        this._maintenanceTagService = ServiceRegistry.resolve(ServiceType.MaintenanceTag);
        this._maintenanceCache = {};
        this._maintenanceTagCache = null;
    }

    /**
     * Get all of the maintenance tags.
     */
    public async getAllMaintenanceTags(): Promise<MaintenanceTag[]> {
        if (this._maintenanceTagCache == null) {
            this._maintenanceTagCache = await this._maintenanceTagService.getAllMaintenanceTags();
        }

        return this._maintenanceTagCache;
    }

    /**
     * Get the maintenance records of a vehicle.
     * @param vehicle The vehicle to get them for.
     */
    public async getMaintenanceForVehicle(vehicle: Vehicle): Promise<Maintenance[]> {
        if (this._maintenanceCache[vehicle.id] == null) {
            this._maintenanceCache[vehicle.id] = await this._maintenanceService.getMaintenanceForVehicle(vehicle);
        }

        return this._maintenanceCache[vehicle.id]!;
    }

    /**
     * Add a maintenance record to the vehicle.
     * @param vehicle The vehicle to add it to.
     * @param maintenance The maintenance record to add.
     */
    public async addMaintenanceForVehicle(vehicle: Vehicle, maintenance: Maintenance): Promise<void> {
        await this._maintenanceService.addMantenanceForVehicle(vehicle, maintenance);

        this._maintenanceCache[vehicle.id]!.push(maintenance);
    }

    /**
     * Delete a maintenance record for a vehicle.
     * @param vehicle The vehicle to delete it for.
     * @param maintenance The maintenance to delete.
     */
    public async deleteMaintenanceForVehicle(vehicle: Vehicle, maintenance: Maintenance): Promise<void> {
        await this._maintenanceService.deleteMaintenance(vehicle, maintenance);

        // Trim the cache
        this._maintenanceCache[vehicle.id]! = this._maintenanceCache[vehicle.id]!.filter((m) => m.id !== maintenance.id);
    }
}
