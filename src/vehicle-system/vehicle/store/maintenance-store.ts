import { StoreModule } from '@/core/store/store-module';
import { MaintenanceTagService } from '../services/maintenance-tag-service';
import { MaintenanceTag } from '../entities/maintenance-tag';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { Nullable } from '@/core/common/monads/nullable';

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
     * The cache of maintenance tags.
     */
    private _maintenanceTagCache: Nullable<MaintenanceTag[]>;

    /**
     * Create a new maintenance store.
     */
    constructor() {
        super();

        this._maintenanceTagService = ServiceRegistry.resolve(ServiceType.MaintenanceTag);
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
}
