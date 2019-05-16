import { StoreModule } from '@/core/store/store-module';
import { VehicleProfilePictureService } from '../services/vehicle-profile-picture-service';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { User } from '@/user-system/entities/user';
import { Vehicle } from '../entities/vehicle/vehicle';
import { VehicleProfilePicture } from '../entities/vehicle/vehicle-profile-picture';
import { Dictionary } from '@/core/common/dictionary';
import { Nullable } from '@/core/common/monads/nullable';
import { NotFoundError } from '@/core/common/errors/not-found-error';

/**
 * Store for handling vehicle profile pictures from the database.
 */
export class VehicleProfilePictureStore extends StoreModule {
    public readonly namespace = 'vehicleProfilePicture';

    /**
     * Service for interacting with images from the backend.
     */
    private _profilePictureService: VehicleProfilePictureService;

    /**
     * The cache that holds onto vehicle profile pictures so we don't need
     * to shoot over to the backend every single time.
     */
    private _cache: Dictionary<VehicleProfilePicture>;

    constructor() {
        super();
        this._profilePictureService = ServiceRegistry.resolve(ServiceType.VehicleProfilePicture);
        this._cache = {};
    }

    /**
     * Get the profile picture of a vehicle. Returns null if not found.
     * @param vehicle The vehicle to get it for.
     */
    public async getVehicleProfilePicture(vehicle: Vehicle): Promise<Nullable<VehicleProfilePicture>> {
        // See if we got it earlier.
        if (this._cache[vehicle.id] != null) {
            return this._cache[vehicle.id];
        }

        try {
            const pic = await this._profilePictureService.getVehicleProfilePicture(User.CURRENT!, vehicle);

            if (pic == null) {
                return null;
            } else {
                this._cache[vehicle.id] = pic;
                return pic;
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                return null;
            }
            // If the error isn't a not found (404) we gotta toss it higher.
            else {
                throw error;
            }
        }
    }

    /**
     * Upload a new profile picture for a vehicle.
     * @param vehicle The vehicle it belongs to.
     * @param picture The picture to upload.
     */
    public async uploadVehicleProfilePicture(vehicle: Vehicle, picture: VehicleProfilePicture) {
        await this._profilePictureService.uploadVehicleProfilePicture(User.CURRENT!, vehicle, picture);
        this._cache[vehicle.id] = picture;
    }

    /**
     * Delete an existing profile picture for a vehicle.
     * @param vehicle The vehicle to delete it for.
     */
    public async deleteVehicleProfilePicture(vehicle: Vehicle) {
        await this._profilePictureService.deleteVehicleProfilePicture(User.CURRENT!, vehicle);
        this._cache[vehicle.id] = null!;
    }
}
