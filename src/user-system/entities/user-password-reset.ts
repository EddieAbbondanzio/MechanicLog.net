
/**
 * Information to reset a user's password.
 */
export interface UserPasswordReset {
    /**
     * The contact email of the user.
     */
    email: string;

    /**
     * The reset token code they were emailed.
     */
    resetToken: string;

    /**
     * The new password of the user.
     */
    newPassword: string;
}
