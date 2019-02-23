import Vue from 'vue';
import Component from 'vue-class-component';
import { Mechanic } from '../entities/mechanic';
import { Getter, Action } from 'vuex-class';

/**
 * Mechanic mixin for everything and anything related
 * to mechanics.
 */
@Component
export class MechanicMixin extends Vue {
    /**
     * The mechanics of the user.
     */
    @Getter('mechanics', { namespace: 'mechanic' })
    private _mechanics!: Mechanic[];

    /**
     * Get the mechanics from the backend
     */
    @Action('getMechanics', { namespace: 'mechanic' })
    private _getMechanics!: () => Promise<Mechanic[]>;

    /**
     * Get the mechanics of the user.
     */
    public async $getMechanics(): Promise<Mechanic[]> {
        if (this._mechanics.length === 0) {
            return this._getMechanics();
        } else {
            return this._mechanics;
        }
    }

    /**
     * Add a new mechanic.
     */
    @Action('addMechanic', { namespace: 'mechanic' })
    protected $addMechanic!: (mechanic: Mechanic) => Promise<void>;

    /**
     * Update an existing mechanic.
     */
    @Action('updateMechanic', { namespace: 'mechanic' })
    protected $updateMechanic!: (mechanic: Mechanic) => Promise<void>;

    /**
     * Delete an existing mechanic.
     */
    @Action('deleteMechanic', { namespace: 'mechanic' })
    protected $deleteMechanic!: (mechanic: Mechanic) => Promise<void>;
}
