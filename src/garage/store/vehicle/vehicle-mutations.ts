import { MutationTree } from 'vuex';
import { VehicleState } from './vehicle-state';
import { Vehicle } from '@/garage/entities/vehicle';


/**
 * Mutations for modifying vehicle store state.
 */
export const vehicleMutations: MutationTree<VehicleState> = {
    /**
     * Set the vehicles of the user.
     * @param state The current state.
     * @param vehicles The vehicles of the user.
     */
    setVehicles(state: VehicleState, vehicles: Vehicle[]): void {
        state.vehicles = vehicles;
    },

    /**
     * Add a new vehicle to the user's list.
     * @param state The current state.
     * @param vehicle The new vehicle to add.
     */
    addVehicle(state: VehicleState, vehicle: Vehicle): void {
        state.vehicles.push(vehicle);
    },

    /**
     * Delete a vehicle from the user's list.
     * @param state The current state.
     * @param vehicle The vehicle to delete.
     */
    deleteVehicle(state: VehicleState, vehicle: Vehicle): void {
        for (let i = 0; i < state.vehicles.length; i++) {
            if (state.vehicles[i] === vehicle) {
                state.vehicles.splice(i, 1);
                return;
            }
        }
    },

    /**
     * Update a vehicle.
     * @param state The current state.
     * @param vehicle The vehicle to update.
     */
    updateVehicle(state: VehicleState, vehicle: Vehicle): void {
        const index: number = state.vehicles.findIndex((v) => v.id === vehicle.id);

        if (index >= 0) {
            state.vehicles[index] = vehicle;
        }
    },
};
