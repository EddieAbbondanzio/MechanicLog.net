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
    @Action('getVehicles', { namespace: 'vehicle' })
    public $getVehicles!: () => Promise<Vehicle[]>;

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
