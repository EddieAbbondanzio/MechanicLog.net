import Vue from 'vue';
import { VehicleStore } from './vehicle-store';
import { Store } from '@/core/store/store';
import Component from 'vue-class-component';

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
     * When the mixin is created, pull in the store.
     */
    public created(): void {
        this.$vehicleStore = Store.resolve<VehicleStore>('vehicle');
    }
}
