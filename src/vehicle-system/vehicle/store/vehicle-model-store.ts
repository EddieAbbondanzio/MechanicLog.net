import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { VehicleModelService } from '../services/vehicle-model-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { Dictionary } from '@/core/common/dictionary';
import { VehicleMake } from '../entities/vehicle-make';
import { VehicleModel } from '../entities/vehicle-model';
import { HttpError } from '@/core/http/service-error';
import { Either } from '@/core/common/monads/either';
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
    public async getModelsForMake(make: VehicleMake): Promise<Either<VehicleModel[], HttpError>> {
        if (this._modelCache[make.name] != null) {
            return Either.left(this._modelCache[make.name]);
        }

        const models = await this._modelService.getAllModelsForMake(User.CURRENT!, make);

        if (models.isRight()) {
            return Either.right(models.getRight());
        }

        this._modelCache[make.name] = models.getLeft();
        return Either.left(models.getLeft());
    }
}
