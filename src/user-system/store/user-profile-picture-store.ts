import { StoreModule } from '@/core/store/store-module';
import { UserProfilePictureService } from '../services/user/user-profile-picture-service';
import { Dictionary } from '@/core/common/dictionary';
import { UserProfilePicture } from '../entities/user-profile-picture';
import { ServiceRegistry } from '@/core/services/service-registry';
import { Nullable } from '@/core/common/monads/nullable';
import { User } from '../entities/user';
import { NotFoundError } from '@/core/common/errors/not-found-error';

export class UserProfilePictureStore extends StoreModule {
    public readonly namespace = 'userProfilePicture';

    /**
     * Service for handling user profile pictures from the backend.
     */
    private _profilePictureService: UserProfilePictureService;

    /**
     * Client-side cache of profile pictures.
     */
    private _cache: Dictionary<UserProfilePicture>;

    constructor() {
        super();
        this._profilePictureService = ServiceRegistry.resolve('userProfilePicture');
        this._cache = {};
    }

    /**
     * Get the profile picture of the user.
     */
    public async getUserProfilePicture(): Promise<Nullable<UserProfilePicture>> {
        if (this._cache[User.CURRENT!.id] != null) {
            return this._cache[User.CURRENT!.id];
        }

        try {
            const pic = await this._profilePictureService.getUserProfilePicture(User.CURRENT!);

            if (pic == null) {
                return null;
            } else {
                this._cache[User.CURRENT!.id] = pic;
                return pic;
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                return null;
            } else {
                throw error;
            }
        }
    }

    /**
     * Upload a new user profile picture for the active user.
     * @param picture The picture to upload.
     */
    public async uploadUserProfilePicture(picture: UserProfilePicture) {
        await this._profilePictureService.uploadUserProfilePicture(User.CURRENT!, picture);
        this._cache[User.CURRENT!.id] = picture;
    }

    /**
     * Delete the profile picture of the current user.
     */
    public async deleteUserProfilePicture() {
        await this._profilePictureService.deleteUserProfilePicture(User.CURRENT!);
        this._cache[User.CURRENT!.id] = null!;
    }
}
