import { ActionTree } from "vuex";
import { MechanicState } from "./mechanic-state";
import { StoreState } from "@/core/store/store-state";
import { Mechanic } from "../entities/mechanic";
import { MechanicService } from "../services/mechanic-service";
import { User } from "@/user-system/entities/user";

/**
 * Actions related to the mechanic store.
 */
export const mechanicActions: ActionTree<MechanicState, StoreState> = {
    async getMechanics(context): Promise<Mechanic[]> {
        const apiUrl: string = context.rootGetters["config/apiUrl"];
        const mechService: MechanicService = new MechanicService(apiUrl);

        const user: User = context.rootGetters["user/current"] as User;
        const mechanics = await mechService.getAllMechanicsForUser(user);

        context.commit("setMechanics", mechanics);
        return mechanics;
    },

    async addMechanic(context, mechanic: Mechanic): Promise<void> {
        const apiUrl: string = context.rootGetters["config/apiUrl"];
        const mechService: MechanicService = new MechanicService(apiUrl);

        const user: User = context.rootGetters["user/current"] as User;
        await mechService.addMechanic(user, mechanic);

        context.commit("addMechanic", mechanic);
    },

    async updateMechanic(context, mechanic: Mechanic): Promise<void> {
        const apiUrl: string = context.rootGetters["config/apiUrl"];
        const mechService: MechanicService = new MechanicService(apiUrl);

        const user: User = context.rootGetters["user/current"] as User;
        await mechService.updateMechanic(user, mechanic);

        context.commit("updateMechanic", mechanic);
    },

    async deleteMechanic(context, mechanic: Mechanic): Promise<void> {
        const apiUrl: string = context.rootGetters["config/apiUrl"];
        const mechService: MechanicService = new MechanicService(apiUrl);

        const user: User = context.rootGetters["user/current"] as User;
        await mechService.deleteMechanic(user, mechanic);

        context.commit("deleteMechanic", mechanic);
    }
};
