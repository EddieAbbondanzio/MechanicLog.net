import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, Action } from 'vuex-class';
import { Vehicle } from '../entities/vehicle';

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
    @Action('getVehicles', { namespace: 'vehicle ' })
    private _getVehicles!: () => Promise<Vehicle[]>;

    /**
     * Get the active vehicles for the user.
     */
    protected async $getVehicles(): Promise<Vehicle[]> {
        // If we have none cached, pull them in from the back end.
        if (this._vehicles == null) {
            this._vehicles = await this._getVehicles();
        }

        return this._vehicles;
    }

    /**
     * Add a new vehicle to the backend for the user.
     */
    @Action('addVehicle', { namespace: 'vehicle ' })
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
