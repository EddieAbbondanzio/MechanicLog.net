import { Service } from './service';
import { Dictionary } from '../common/dictionary';
import { ServiceType } from './service-type';
import store from '../store/store';
import { ConfigState } from '../store/config/config-state';
import { AuthService } from '@/user-system/services/auth/auth-service';
import { UserService } from '@/user-system/services/user/user-service';
import { MechanicService } from '@/vehicle-system/mechanic/services/mechanic-service';
import { VehicleService } from '@/vehicle-system/vehicle/services/vehicle-service';

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
        const apiUrl: string = ((store.state as any).config as ConfigState).apiUrl;

        this.register(ServiceType.Auth, new AuthService(apiUrl));
        this.register(ServiceType.User, new UserService(apiUrl));
        this.register(ServiceType.Mechanic, new MechanicService(apiUrl));
        this.register(ServiceType.Vehicle, new VehicleService(apiUrl));
    }

    /**
     * Resolve a service type from the registry.
     * @param type The service symbol to look for.
     */
    public static resolve<T extends Service>(type: ServiceType): T {
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
    public static register<T extends Service>(type: ServiceType, instance: T): void {
        this._store[type] = instance;
    }
}
