import { ActionTree } from "vuex";
import { MechanicState } from "./mechanic-state";
import { StoreState } from "@/core/store/store-state";
import { Mechanic } from "../entities/mechanic";
import { MechanicService } from "../services/mechanic-service";
import { User } from "@/user-system/entities/user";
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';

/**
 * Actions related to the mechanic store.
 */
export const mechanicActions: ActionTree<MechanicState, StoreState> = {
    async getMechanics(context): Promise<Mechanic[]> {
        const mechService: MechanicService = ServiceRegistry.resolve(ServiceType.Mechanic);

        const user: User = context.rootGetters["user/current"] as User;
        const mechanics = await mechService.getAllMechanicsForUser(user);

        context.commit("setMechanics", mechanics);
        return mechanics;
    },

    async addMechanic(context, mechanic: Mechanic): Promise<void> {
        const mechService: MechanicService = ServiceRegistry.resolve(ServiceType.Mechanic);

        const user: User = context.rootGetters["user/current"] as User;
        await mechService.addMechanic(user, mechanic);

        context.commit("addMechanic", mechanic);
    },

    async updateMechanic(context, mechanic: Mechanic): Promise<void> {
        const mechService: MechanicService = ServiceRegistry.resolve(ServiceType.Mechanic);

        const user: User = context.rootGetters["user/current"] as User;
        await mechService.updateMechanic(user, mechanic);

        context.commit("updateMechanic", mechanic);
    },

    async deleteMechanic(context, mechanic: Mechanic): Promise<void> {
        const mechService: MechanicService = ServiceRegistry.resolve(ServiceType.Mechanic);

        const user: User = context.rootGetters["user/current"] as User;
        await mechService.deleteMechanic(user, mechanic);

        context.commit("deleteMechanic", mechanic);
    }
};
