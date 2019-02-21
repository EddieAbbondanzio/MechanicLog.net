import { Mechanic } from '../entities/mechanic';

/**
 * Mechanic state for Vue.
 */
export interface MechanicState {
    /**
     * The mechanic's of the user.
     */
    mechanics: Mechanic[];
}
