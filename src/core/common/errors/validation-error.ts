/**
 * Validation error that failed in the backend.
 */
export class ValidationError extends Error {
    /**
     * The errors of what caused it to fail.
     */
    public readonly messageList: string[];

    /**
     * Create a new validation error.
     * @param messageList The error messages.
     */
    constructor(messageList: string[]) {
        super(messageList.join(' '));
        this.messageList = messageList;
    }
}
