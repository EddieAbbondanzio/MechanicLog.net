import { SubscriptionServiceType } from '@/subscription-system/services/subscription-service-type';
import { SupportServiceType } from '@/support/services/support-service-type';
import { UserServiceType } from '@/user-system/services/user-service-type';
import { VehicleServiceType } from '@/vehicle-system/services/vehicle-service-type';

/**
 * Service identifiers for business layer services.
 */
export type ServiceType = SubscriptionServiceType | SupportServiceType | UserServiceType | VehicleServiceType;
