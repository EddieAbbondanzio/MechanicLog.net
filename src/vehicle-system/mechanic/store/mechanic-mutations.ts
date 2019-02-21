import { MutationTree } from "vuex";
import { MechanicState } from "./mechanic-state";
import { Mechanic } from "../entities/mechanic";

/**
 * Mutations for modiyfing mechanic store state.
 */
export const mechanicMutations: MutationTree<MechanicState> = {
    /**
     * Set the mechanics of the user.
     * @param state The current state.
     * @param mechanics The mechanics to add.
     */
    setMechanics(state: MechanicState, mechanics: Mechanic[]): void {
        state.mechanics = mechanics;
    },

    /**
     * Add a new mechanic to the user's list.
     * @param state The current state.
     * @param mechanic The mechanic to add.
     */
    addMechanic(state: MechanicState, mechanic: Mechanic): void {
        state.mechanics.push(mechanic);
    },

    /**
     * Update an existing mechanic.
     * @param state The current state.
     * @param mechanic The mechanic to update.
     */
    updateMechanic(state: MechanicState, mechanic: Mechanic): void {
        const index = state.mechanics.findIndex((m) => m.id === mechanic.id);

        if (index !== -1) {
            // Force refresh...
            state.mechanics.splice(index, 1);
            state.mechanics.splice(index, 0, mechanic);
        }
    },

    /**
     * Delete an existing mechanic.
     * @param state The current state.
     * @param mechanic The mechanic to delete.
     */
    deleteMechanic(state: MechanicState, mechanic: Mechanic): void {
        for (let i = 0; i < state.mechanics.length; i++) {
            if (state.mechanics[i] === mechanic) {
                state.mechanics.splice(i, 1);
                return;
            }
        }
    }
};
