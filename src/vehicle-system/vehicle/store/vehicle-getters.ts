import { GetterTree } from 'vuex';
import { VehicleState } from './vehicle-state';
import { StoreState } from '@/core/store/store-state';
import { Vehicle } from '@/vehicle-system/vehicle/entities/vehicle';

/**
 * Getters for interacting with the vehicle Vuex store.
 */
export const vehicleGetters: GetterTree<VehicleState, StoreState> = {
    /**
     * Get all of the vehicles for the current user.
     * @param state The active store state.
     */
    vehicles(state: VehicleState): Vehicle[] {
        return state.vehicles;
    },
};
