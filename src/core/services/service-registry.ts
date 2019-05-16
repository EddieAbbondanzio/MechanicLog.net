import { Service } from './service';
import { Dictionary } from '../common/dictionary';
import { ServiceType } from './service-type';
import { AuthService } from '@/user-system/services/auth/auth-service';
import { UserService } from '@/user-system/services/user/user-service';
import { MechanicService } from '@/vehicle-system/services/mechanic-service';
import { VehicleService } from '@/vehicle-system/services/vehicle-service';
import { Store } from '../store/store';
import { VehicleMakeService } from '@/vehicle-system/services/vehicle-make-service';
import { VehicleModelService } from '@/vehicle-system/services/vehicle-model-service';
import { SubscriptionService } from '@/subscription-system/services/subscription-service';
import { SubscriptionPlanService } from '@/subscription-system/services/subscription-plan-service';
import { VehiclePurchaseInfoService } from '@/vehicle-system/services/vehicle-purchase-info-service';
import { FuelTripService } from '@/vehicle-system/services/fuel-trip-service';
import { MaintenanceTagService } from '@/vehicle-system/services/maintenance-tag-service';
import { MaintenanceService } from '@/vehicle-system/services/maintenance-service';
import { ContactService } from '@/support/services/contact-service';
import { VehicleProfilePictureService } from '@/vehicle-system/services/vehicle-profile-picture-service';

/**
 * Helper to locate, and register services for use later on.
 */
export class ServiceRegistry {
    /**
     * The data store of the locator.
     */
    private static _store: Dictionary<Service> = {};

    /**
     * Initialize the registry for use.
     */
    public static initialize(): void {
        this.register(new AuthService(Store.backendUrl));
        this.register(new UserService(Store.backendUrl));
        this.register(new MechanicService(Store.backendUrl));
        this.register(new VehicleService(Store.backendUrl));
        this.register(new VehicleMakeService(Store.backendUrl));
        this.register(new VehicleModelService(Store.backendUrl));
        this.register(new VehiclePurchaseInfoService(Store.backendUrl));
        this.register(new VehicleProfilePictureService(Store.backendUrl));
        this.register(new SubscriptionService(Store.backendUrl));
        this.register(new SubscriptionPlanService(Store.backendUrl));
        this.register(new FuelTripService(Store.backendUrl));
        this.register(new MaintenanceService(Store.backendUrl));
        this.register(new MaintenanceTagService(Store.backendUrl));
        this.register(new ContactService(Store.backendUrl));
    }

    /**
     * Resolve a service type from the registry.
     * @param type The service symbol to look for.
     */
    public static resolve<T extends Service>(type: ServiceType): T {
        if (this._store === {}) {
            throw new Error('Did you forget to initialize the service registry?');
        }

        /*
         * Normally I'd like to return a Maybe<T> but if a service is missing
         * something went REALLY wrong, and this seems more fair.
         */
        if (this._store[type] == null) {
            throw new Error(`Service type: ${type} not found!`);
        }

        return this._store[type] as T;
    }

    /**
     * Register an instance of the service with the registry.
     * @param type The symbol to register it under.
     * @param instance The instance to register.
     */
    private static register<T extends Service>(instance: T): void {
        this._store[instance.type] = instance;
    }
}
