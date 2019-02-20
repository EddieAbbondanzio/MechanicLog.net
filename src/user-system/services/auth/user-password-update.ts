
/**
 * Information of a user that want's to update their password.
 */
export interface UserPasswordUpdate {
    /**
     * The current password of the user.
     */
    currentPassword: string;

    /**
     * The new password of the user.
     */
    newPassword: string;
}
