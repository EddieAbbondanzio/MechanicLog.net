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
     * Update the nick name of a vehicle.
     * @param state The current state.
     * @param updateInfo The info to use to update.
     */
    updateVehicleName(state: VehicleState, updateInfo: { vehicleId: number, name: string }): void {
        const vehicle: Vehicle | undefined = state.vehicles.find((v) => v.id === updateInfo.vehicleId);

        if (vehicle != null) {
            vehicle.name = updateInfo.name;
        }
    },

    /**
     * Update the year of a vehicle.
     * @param state The current state.
     * @param updateInfo The info to use to update.
     */
    updateVehicleYear(state: VehicleState, updateInfo: { vehicleId: number, year: number }): void {
        const vehicle: Vehicle | undefined = state.vehicles.find((v) => v.id === updateInfo.vehicleId);

        if (vehicle != null) {
            vehicle.year = updateInfo.year;
        }
    },

    /**
     * Update the make of a vehicle.
     * @param state The current state.
     * @param updateInfo The info to use to update.
     */
    updateVehicleMake(state: VehicleState, updateInfo: { vehicleId: number, make: string }): void {
        const vehicle: Vehicle | undefined = state.vehicles.find((v) => v.id === updateInfo.vehicleId);

        if (vehicle != null) {
            vehicle.make = updateInfo.make;
        }
    },

    /**
     * Update the model of a vehicle.
     * @param state The current state.
     * @param updateInfo The info to use to update.
     */
    updateVehicleModel(state: VehicleState, updateInfo: { vehicleId: number, model: string }): void {
        const vehicle: Vehicle | undefined = state.vehicles.find((v) => v.id === updateInfo.vehicleId);

        if (vehicle != null) {
            vehicle.model = updateInfo.model;
        }
    },

    /**
     * Update the mileage of a vehicle.
     * @param state The current state.
     * @param updateInfo The info to use to update.
     */
    updateVehicleMileage(state: VehicleState, updateInfo: { vehicleId: number, mileage: number }): void {
        const vehicle: Vehicle | undefined = state.vehicles.find((v) => v.id === updateInfo.vehicleId);

        if (vehicle != null) {
            vehicle.mileage = updateInfo.mileage;
        }
    },
};
