import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { MechanicService } from '../services/mechanic-service';
import { Mechanic } from '../entities/mechanic';
import { Nullable } from '@/core/common/monads/nullable';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { User } from '@/user-system/entities/user';
import { Maybe } from '@/core/common/monads/maybe';

/**
 * Store for mechanics of the user.
 */
export class MechanicStore extends StoreModule {
    /**
     * The namespace of the store.
     */
    public readonly namespace: StoreModuleNamespace = 'mechanic';

    /**
     * The underlying service to the backend.
     */
    private _mechanicService!: MechanicService;

    /**
     * Cache of mechanics from the backend.
     */
    private _mechanicCache!: Nullable<Mechanic[]>;

    constructor() {
        super();
        this._mechanicService = ServiceRegistry.resolve('mechanic');
        this._mechanicCache = null;
    }

    /**
     * Get all mechanics for the user.
     */
    public async getMechanics(): Promise<Mechanic[]> {
        if (this._mechanicCache == null) {
            this._mechanicCache = await this._mechanicService.getAllMechanicsForUser(User.CURRENT!);
        }

        return this._mechanicCache;
    }

    /**
     * Get a specific mechanic.
     * @param id GThe ID of the mechanic.
     */
    public async getMechanic(id: number): Promise<Nullable<Mechanic>> {
        const mechanics = await this.getMechanics();
        const mechanic = mechanics.find((m) => m.id === id);
        return mechanic == null ? null : mechanic;
    }

    /**
     * Add a mecahnic to the database.
     * @param mechanic The mechanic to add.
     */
    public async addMechanic(mechanic: Mechanic): Promise<void> {
        await this._mechanicService.addMechanic(User.CURRENT!, mechanic);
        this._mechanicCache!.push(mechanic);
    }

    /**
     * Update an existing mechanic with the database.
     * @param mechanic The mechanic to update.
     */
    public async updateMechanic(mechanic: Mechanic): Promise<void> {
        await this._mechanicService.updateMechanic(User.CURRENT!, mechanic);
        const index: number = this._mechanicCache!.findIndex((m) => m.id === mechanic.id);
        if (index !== -1) {
            this._mechanicCache![index] = mechanic;
        }
    }

    /**
     * Delete an existing mechanic from the database.
     * @param mechanic The mechanic to delete.
     */
    public async deleteMechanic(mechanic: Mechanic): Promise<void> {
        await this._mechanicService.deleteMechanic(User.CURRENT!, mechanic);

        const index: number = this._mechanicCache!.findIndex((m) => m.id === mechanic.id);
        if (index !== -1) {
            this._mechanicCache!.splice(index, 1);
        }
    }
}
