import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { MechanicService } from './services/mechanic-service';
import { Mechanic } from './entities/mechanic';
import { Nullable } from '@/core/common/monads/nullable';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { ServiceError } from '@/core/services/service-error';
import { Either } from '@/core/common/monads/either';
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
        this._mechanicService = ServiceRegistry.resolve(ServiceType.Mechanic);
        this._mechanicCache = null;
    }

    /**
     * Get all mechanics for the user.
     */
    public async getMechanics(): Promise<Either<Mechanic[], ServiceError>> {
        if (this._mechanicCache == null) {
            const apiResponse = await this._mechanicService.getAllMechanicsForUser(User.CURRENT!);

            if (apiResponse.isLeft()) {
                this._mechanicCache = apiResponse.getLeft();
            } else {
                return apiResponse;
            }
        }

        return Either.left(this._mechanicCache);
    }

    /**
     * Get a specific mechanic.
     * @param id GThe ID of the mechanic.
     */
    public async getMechanic(id: number): Promise<Either<Nullable<Mechanic>, ServiceError>> {
        const mechanics = await this.getMechanics();

        // Error
        if (mechanics.isRight()) {
            return Either.right(mechanics.getRight());
        }

        const mechanic = mechanics.getLeft().find((m) => m.id === id);
        // I hate undefined...
        return Either.left(mechanic == null ? null : mechanic);
    }

    /**
     * Add a mecahnic to the database.
     * @param mechanic The mechanic to add.
     */
    public async addMechanic(mechanic: Mechanic): Promise<Maybe<ServiceError>> {
        const apiResponse = await this._mechanicService.addMechanic(User.CURRENT!, mechanic);

        // Errored out.
        if (apiResponse.hasSome()) {
            return apiResponse;
        }

        this._mechanicCache!.push(mechanic);
        return Maybe.none();
    }

    /**
     * Update an existing mechanic with the database.
     * @param mechanic The mechanic to update.
     */
    public async updateMechanic(mechanic: Mechanic): Promise<Maybe<ServiceError>> {
        const apiResponse = await this._mechanicService.updateMechanic(User.CURRENT!, mechanic);

        // Errored out.
        if (apiResponse.hasSome()) {
            return apiResponse;
        }

        const index: number = this._mechanicCache!.findIndex((m) => m.id === mechanic.id);
        if (index !== -1) {
            this._mechanicCache![index] = mechanic;
        }
        return Maybe.none();
    }

    /**
     * Delete an existing mechanic from the database.
     * @param mechanic The mechanic to delete.
     */
    public async deleteMechanic(mechanic: Mechanic): Promise<Maybe<ServiceError>> {
        const apiResponse = await this._mechanicService.deleteMechanic(User.CURRENT!, mechanic);

        // Errored out.
        if (apiResponse.hasSome()) {
            return apiResponse;
        }

        const index: number = this._mechanicCache!.findIndex((m) => m.id === mechanic.id);
        if (index !== -1) {
            this._mechanicCache!.splice(index, 1);
        }
        return Maybe.none();
    }
}
