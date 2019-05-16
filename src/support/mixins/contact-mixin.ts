import Vue from 'vue';
import Component from 'vue-class-component';
import { Store } from '@/core/store/store';
import { ContactStore } from '../store/contact-store';

/**
 * User mixin for everything and anything related to users.
 */
@Component
export class ContactMixin extends Vue {
    /**
     * The contact store.
     */
    public $contactStore!: ContactStore;

    /**
     * When the mixin is created pull in the store.
     */
    public created(): void {
        this.$contactStore = Store.resolve('contact');
    }
}
