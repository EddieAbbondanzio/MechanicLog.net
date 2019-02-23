import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, Action } from 'vuex-class';
import { Vehicle } from '../entities/vehicle';
import { Maybe } from '@/core/common/monads/maybe';

/**
 * Vehicle mixin for everything and anything related to vehicles.
 */
@Component
export class VehicleMixin extends Vue {
    /**
     * The vehicles of the user.
     */
    @Getter('vehicles', { namespace: 'vehicle' })
    private _vehicles!: Vehicle[];

    /**
     * Get the vehicles of the user from the backend.
     */
    @Action('getVehicles', { namespace: 'vehicle' })
    private _getVehicles!: () => Promise<Vehicle[]>;

    /**
     * Get the mechanics of the user.
     */
    public async $getVehicles(): Promise<Vehicle[]> {
        if (this._vehicles.length === 0) {
            return this._getVehicles();
        } else {
            return this._vehicles;
        }
    }

    /**
     * Retreive a specific vehicle using it's unique ID.
     * @param id The ID of the vehicle to retrieve.
     */
    public async $getVehicle(id: number): Promise<Maybe<Vehicle>> {
        const vehicles: Vehicle[] = await this.$getVehicles();
        const index: number = vehicles.findIndex((v) => v.id === id);

        return index !== -1 ? Maybe.some(vehicles[index]) : Maybe.none();
    }

    /**
     * Add a new vehicle to the backend for the user.
     */
    @Action('addVehicle', { namespace: 'vehicle' })
    protected $addVehicle!: (vehicle: Vehicle) => Promise<void>;

    /**
     * Update an existing vehicle for a user with the backend.
     */
    @Action('updateVehicle', { namespace: 'vehicle' })
    protected $updateVehicle!: (vehicle: Vehicle) => Promise<void>;

    /**
     * Delete an existing vehicle for a user with the backend.
     */
    @Action('deleteVehicle', { namespace: 'vehicle' })
    protected $deleteVehicle!: (vehicle: Vehicle) => Promise<void>;
}
