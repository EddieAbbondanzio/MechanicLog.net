import Vue from 'vue';
import { Store } from '@/core/store/store';
import Component from 'vue-class-component';
import { VehicleStore } from './store/vehicle-store';
import { VehicleMakeStore } from './store/vehicle-make-store';
import { VehicleModelStore } from './store/vehicle-model-store';

/**
 * Mixin for common vehicle properties
 */
@Component
export class VehicleMixin extends Vue {
    /**
     * The store that vehicles are kept in.
     */
    protected $vehicleStore!: VehicleStore;

    /**
     * All of the vehicle makes available.
     */
    protected $vehicleMakeStore!: VehicleMakeStore;

    /**
     * All of the vehicle models available.
     */
    protected $vehicleModelStore!: VehicleModelStore;

    /**
     * When the mixin is created, pull in the store.
     */
    public created(): void {
        this.$vehicleStore = Store.resolve<VehicleStore>('vehicle');
        this.$vehicleMakeStore = Store.resolve<VehicleMakeStore>('vehicleMake');
        this.$vehicleModelStore = Store.resolve('vehicleModel');
    }
}
