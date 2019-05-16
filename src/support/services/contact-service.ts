import { Service } from '@/core/services/service';
import { ContactMessage } from '../entities/contact-message';

/**
 * Service for sending contact messages.
 */
export class ContactService extends Service {
    public readonly type = 'contact';

    /**
     * Send a contact message to the server.
     * @param contactMessage The message to send in.
     */
    public async sendContactMessage(contactMessage: ContactMessage) {
        await this._httpClient.post('/v1/contact/', contactMessage);
    }
}
