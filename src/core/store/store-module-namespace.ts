import { SupportStoreModuleNamespace } from '@/support/store/support-store-module-namespace';
import { UserStoreModuleNamespace } from '@/user-system/store/user-store-module-namespace';
import { SubscriptionStoreModuleNamespace } from '@/subscription-system/store/subscription-store-module-namespace';
import { VehicleStoreModuleNamespace } from '@/vehicle-system/store/vehicle-store-module-namespace';

/**
 * String based enum for identifying modules.
 */
export type StoreModuleNamespace = VehicleStoreModuleNamespace | SubscriptionStoreModuleNamespace | UserStoreModuleNamespace | SupportStoreModuleNamespace;
