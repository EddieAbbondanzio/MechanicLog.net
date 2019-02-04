import { ActionTree, ActionContext } from 'vuex';
import { VehicleState } from './vehicle-state';
import { StoreState } from '@/core/store/store-state';
import { Vehicle } from '@/garage/entities/vehicle';
import { VehicleService } from '@/garage/services/vehicle/vehicle-service';
import { User } from '@/user-system/entities/user';

/**
 * Actions related to the vehicle state.
 */
export const vehicleActions: ActionTree<VehicleState, StoreState> = {
    /**
     * Get all the vehicles of a user.
     * @param context The active context.
     */
    async getVehicles(context: ActionContext<VehicleState, StoreState>): Promise<Vehicle[]> {
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const vehicleService: VehicleService = new VehicleService(apiUrl);
 
        const user: User = context.rootGetters('user/current') as User;
        const vehicles: Vehicle[] = await vehicleService.getAllVehiclesForUser(user);

        context.commit('setVehicles', vehicles);
        return vehicles;
    },

    /**
     * Get a specific vehicle by it's ID for the user.
     * @param context The active context.
     * @param id The ID of the vehicle.
     */
    async getVehicle(context: ActionContext<VehicleState, StoreState>, id: number): Promise<Vehicle | undefined> {
        const apiUrl: string = context.rootGetters['config/apiUrl'];
        const vehicleService: VehicleService = new VehicleService(apiUrl);

        const vehicles: Vehicle[] = context.getters('vehicles') as Vehicle[];
        return vehicles.find((v) => v.id === id);
    },
}
