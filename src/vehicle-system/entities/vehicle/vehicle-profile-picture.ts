import { VehicleResource } from '../../common/vehicle-resource';
import { UserResource } from '@/user-system/common/user-resource';
import { Picture } from '@/core/common/picture';

/**
 * Profile picture of a user's vehicle.
 */
export class VehicleProfilePicture implements Picture, VehicleResource {
    public id: number;

    public vehicleId: number;

    /**
     * The raw data of the image.
     */
    public data: string;

    /**
     * The original filename.
     */
    public fileName: string;

    /**
     * The file extension minus the period!
     */
    public fileType: string;

    /**
     * Create a new vehicle profile picture.
     */
    constructor(params: { id?: number; vehicleId?: number; data: string; fileName: string; fileType: string }) {
        this.id = params.id != null ? params.id : 0;
        this.vehicleId = params.vehicleId != null ? params.vehicleId : 0;
        this.data = params.data;
        (this.fileName = params.fileName), (this.fileType = params.fileType);
    }

    public toJSON(): {} {
        return {
            vehicleId: this.vehicleId,
            data: this.data,
            fileName: this.fileName,
            fileType: this.fileType,
        };
    }
}
