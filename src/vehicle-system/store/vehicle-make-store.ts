import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { VehicleMakeService } from '../services/vehicle-make-service';
import { Nullable } from '@/core/common/monads/nullable';
import { VehicleMake } from '../entities/vehicle/vehicle-make';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { User } from '@/user-system/entities/user';
import { Either } from '@/core/common/monads/either';

export class VehicleMakeStore extends StoreModule {
    public readonly namespace: StoreModuleNamespace = 'vehicleMake';

    /**
     * The API interface for makes from the database.
     */
    private _makeService: VehicleMakeService;

    /**
     * Cache of makes we've retrieved.
     */
    private _makeCache: Nullable<VehicleMake[]>;

    constructor() {
        super();
        this._makeService = ServiceRegistry.resolve(ServiceType.VehicleMake);
        this._makeCache = null;
    }

    /**
     * Get all the vehicle makes.
     */
    public async getMakes(): Promise<VehicleMake[]> {
        if (this._makeCache == null) {
            const apiResponse = await this._makeService.getAllMakes(User.CURRENT!);
            this._makeCache = apiResponse;
        }

        return this._makeCache;
    }
}
