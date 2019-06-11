import { Service } from '@/core/services/service';
import { ServiceType } from '@/core/services/service-type';
import { User } from '@/user-system/entities/user';
import { Nullable } from '@/core/common/monads/nullable';
import { UserProfilePicture } from '@/user-system/entities/user-profile-picture';

/**
 * Service for managing user profile pictures from the back end.
 */
export class UserProfilePictureService extends Service {
    public type: ServiceType = 'userProfilePicture';

    /**
     * Get the profile picture of a user.
     * @param user The user to get it for.
     */
    public async getUserProfilePicture(user: User): Promise<Nullable<UserProfilePicture>> {
        const result = await this._httpClient.get(`/v1/user/profile-picture`, user.authToken);

        return new UserProfilePicture({
            id: result.data.id,
            userId: result.data.userId,
            data: result.data.data,
            fileName: result.data.fileName,
            fileType: result.data.fileType
        });
    }

    /**
     * Upload a profile picture for a user.
     * @param user The user to upload it for.
     * @param picture The picture to upload.
     */
    public async uploadUserProfilePicture(user: User, picture: UserProfilePicture) {
        await this._httpClient.post(`/v1/user/profile-picture`, picture, user.authToken);
    }

    /**
     * Delete a profile picture for a user.
     * @param user The user to delete it for.
     */
    public async deleteUserProfilePicture(user: User) {
        await this._httpClient.delete('/v1/user/profile-picture', user.authToken);
    }
}
