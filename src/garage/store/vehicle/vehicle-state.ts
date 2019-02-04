import { Vehicle } from '@/garage/entities/vehicle';

/**
 * Vehicle state for Vuex.
 */
export interface VehicleState {
    /**
     * The list of the user's vehicles.
     */
    vehicles: Vehicle[];
}
