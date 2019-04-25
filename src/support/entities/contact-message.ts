/**
 * Contact message sent in from a user.
 */
export class ContactMessage {
    /**
     * The contact email to respond to.
     */
    public email!: string;

    /**
     * The subject line of the .
     */
    public subject!: string;

    /**
     * The body of the message.
     */
    public body!: string;

    /**
     * Create a new contact message.
     * @param opts The optional parameters of the object.
     */
    constructor(opts: Partial<ContactMessage> = {}) {
        Object.assign(this, opts);
    }
}
