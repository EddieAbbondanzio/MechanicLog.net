import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { ContactService } from '../services/contact-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { ContactMessage } from '../entities/contact-message';

/**
 * Store for sending contact messages to the database.
 */
export class ContactStore extends StoreModule {
    public readonly namespace: StoreModuleNamespace = 'contact';

    /**
     * The underlying contact service.
     */
    private _contactService: ContactService;

    constructor() {
        super();
        this._contactService = ServiceRegistry.resolve(ServiceType.Contact);
    }

    /**
     * Send a contact message in to support.
     * @param contactMessage The contact message to send.
     */
    public async sendContactMessage(contactMessage: ContactMessage) {
        this._contactService.sendContactMessage(contactMessage);
    }
}
