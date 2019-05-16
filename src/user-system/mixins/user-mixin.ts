import Vue from 'vue';
import Component from 'vue-class-component';
import { UserStore } from '../store/user-store';
import { Store } from '@/core/store/store';

/**
 * User mixin for everything and anything related to users.
 */
@Component
export class UserMixin extends Vue {
    /**
     * The cache for user info.
     */
    public $userStore!: UserStore;

    /**
     * When the mixin is created pull in the store.
     */
    public created(): void {
        this.$userStore = Store.resolve('user');
    }
}
