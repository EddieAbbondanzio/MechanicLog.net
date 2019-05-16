import Vue from 'vue';
import Component from 'vue-class-component';
import { MechanicStore } from '../store/mechanic-store';
import { Store } from '@/core/store/store';

/**
 * Mechanic mixin for everything and anything related
 * to mechanics.
 */
@Component
export class MechanicMixin extends Vue {
    /**
     * The store that mechanics are kept in.
     */
    protected $mechanicStore!: MechanicStore;

    /**
     * When the mixin is created, pull in the store.
     */
    public created(): void {
        this.$mechanicStore = Store.resolve<MechanicStore>('mechanic');
    }
}
