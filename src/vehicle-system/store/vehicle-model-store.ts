import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { VehicleModelService } from '../services/vehicle-model-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { Dictionary } from '@/core/common/dictionary';
import { VehicleMake } from '../entities/vehicle/vehicle-make';
import { VehicleModel } from '../entities/vehicle/vehicle-model';
import { User } from '@/user-system/entities/user';

/**
 * Store for holding vehicle models.
 */
export class VehicleModelStore extends StoreModule {
    public readonly namespace: StoreModuleNamespace = 'vehicleModel';

    /**
     * The API service.
     */
    private _modelService: VehicleModelService;

    /**
     * Cache to hold vehicle models.
     */
    private _modelCache: Dictionary<VehicleModel[]>;

    constructor() {
        super();
        this._modelService = ServiceRegistry.resolve(ServiceType.VehicleModel);
        this._modelCache = {};
    }

    /**
     * Get all the models for a specific make.
     * @param make The make to get the models for.
     */
    public async getModelsForMake(make: VehicleMake): Promise<VehicleModel[]> {
        if (this._modelCache[make.name] != null) {
            return this._modelCache[make.name];
        }

        const models = await this._modelService.getAllModelsForMake(User.CURRENT!, make);
        this._modelCache[make.name] = models;
        return models;
    }
}
