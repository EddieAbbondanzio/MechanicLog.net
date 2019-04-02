import { StoreModule } from '@/core/store/store-module';
import { VehicleSettings } from '../entities/vehicle-settings';
import { VehicleSettingsService } from '../services/vehicle-settings-service';
import { Dictionary } from 'vue-router/types/router';
import { Nullable } from '@/core/common/monads/nullable';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { Vehicle } from '../entities/vehicle';

/**
 * Store for interacting with vehicle settings.
 */
export class VehicleSettingsStore extends StoreModule {
    public readonly namespace = 'vehicleSettings';

    /**
     * Service for retrieving settings from the backend.
     */
    private _settingsService!: VehicleSettingsService;

    /**
     * Cache to hold them after getting them from the
     * back end.
     */
    private _settingsCache!: Dictionary<Nullable<VehicleSettings>>;

    constructor() {
        super();
        this._settingsService = ServiceRegistry.resolve(ServiceType.VehicleSettings);
        this._settingsCache = {};
    }

    /**
     * Get the settings for a vehicle.
     * @param vehicle The vehicle to get the settings of.
     */
    public async getVehicleSettings(vehicle: Vehicle): Promise<VehicleSettings> {
        if (this._settingsCache[vehicle.id] == null) {
            this._settingsCache[vehicle.id] = await this._settingsService.getVehicleSettings(vehicle);
        }

        return this._settingsCache[vehicle.id]!;
    }

    /**
     * Update the settings of a vehicle.
     * @param settings The settings to update.
     */
    public async updateVehicleSettings(settings: VehicleSettings): Promise<void> {
        await this._settingsService.updateVehicleSettings(settings);
    }
}
