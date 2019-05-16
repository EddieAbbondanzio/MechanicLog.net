import { StoreModule } from './store-module';
import { Dictionary } from '../common/dictionary';
import { UserStore } from '@/user-system/store/user-store';
import { MechanicStore } from '@/vehicle-system/store/mechanic-store';
import { VehicleStore } from '@/vehicle-system/store/vehicle-store';
import { config } from '../../../config';
import { VehicleMakeStore } from '@/vehicle-system/store/vehicle-make-store';
import { VehicleModelStore } from '@/vehicle-system/store/vehicle-model-store';
import { SubscriptionStore } from '@/subscription-system/store/subscription-store';
import { VehiclePurchaseInfoStore } from '@/vehicle-system/store/vehicle-purchase-info-store';
import { FuelTripStore } from '@/vehicle-system/store/fuel-trip-store';
import { MaintenanceStore } from '@/vehicle-system/store/maintenance-store';
import { ContactStore } from '@/support/store/contact-store';
import { VehicleProfilePictureStore } from '@/vehicle-system/store/vehicle-profile-picture-store';

/**
 * State store for managing data from the backend.
 */
export class Store {
    /**
     * Underlying diction for that sweet O(1) look up time.
     */
    private static _modules: Dictionary<StoreModule> = {};

    /**
     * The URL to the backend.
     */
    public static readonly backendUrl: string = config.backendUrl;

    /**
     * Initialize the store for use.
     */
    public static initialize(): void {
        this.register(new UserStore());
        this.register(new MechanicStore());
        this.register(new VehicleStore());
        this.register(new VehicleMakeStore());
        this.register(new VehicleModelStore());
        this.register(new SubscriptionStore());
        this.register(new VehiclePurchaseInfoStore());
        this.register(new FuelTripStore());
        this.register(new MaintenanceStore());
        this.register(new ContactStore());
        this.register(new VehicleProfilePictureStore());
    }

    /**
     * Get a module from the store.
     * @param namespace The namespace of the module to get.
     */
    public static resolve<TModule extends StoreModule>(namespace: string): TModule {
        if (this._modules[namespace] == null) {
            throw new Error(`No module with namespace ${namespace} found.`);
        }

        return this._modules[namespace] as TModule;
    }

    /**
     * Register a module with the store.
     * @param module The module to register with the store.
     */
    private static register<TModule extends StoreModule>(module: TModule): void {
        if (this._modules[module.namespace] != null) {
            throw new Error(`Module overlap. Module with namespace ${module.namespace} has already been registered.`);
        }

        this._modules[module.namespace] = module;
    }
}
