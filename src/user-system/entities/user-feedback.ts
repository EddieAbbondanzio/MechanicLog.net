import { UserFeedbackType } from './user-feedback-type';

/**
 * Feedback from the user.
 */
export class UserFeedback {
    /**
     * The type of feeedback it is.
     */
    public type!: UserFeedbackType;

    /**
     * The feedback message.
     */
    public message!: string;

    /**
     * Create a new user feedback.
     * @param type The type of feedback it is.
     * @param message The message of it.
     */
    constructor(type: UserFeedbackType, message: string) {
        this.type = type;
        this.message = message;
    }

    /**
     * Rebuild an user feedback object from it's object literal
     * @param raw The raw object to rebuild it from.
     */
    public static fromRaw(raw: any): UserFeedback {
        return new UserFeedback(raw.type, raw.message);
    }
}
