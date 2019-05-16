import { VehicleResource } from '../../common/vehicle-resource';

/**
 * Profile picture of a user's vehicle.
 */
export class VehicleProfilePicture implements VehicleResource {
    public userId: number;

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
    constructor(userId: number, vehicleId: number, data: string, fileName: string, fileType: string) {
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.data = data;
        this.fileName = fileName;
        this.fileType = fileType;
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
