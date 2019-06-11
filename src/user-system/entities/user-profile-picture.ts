import { UserResource } from "../common/user-resource";
import { Picture } from "@/core/common/picture";

/**
 * The profile picture of a user.
 */
export class UserProfilePicture implements Picture, UserResource {
    public id: number;

    /**
     * The user that owns it.
     */
    public userId: number;

    /**
     * The raw data of the image.
     */
    public data: string;

    /**
     * The original file name.
     */
    public fileName: string;

    /**
     * The file extension (no period).
     */
    public fileType: string;

    constructor(params: {
        id?: number;
        userId?: number;
        data: string;
        fileName: string;
        fileType: string;
    }) {
        this.id = params.id != null ? params.id : 0;
        this.userId = params.userId != null ? params.userId : 0;
        this.data = params.data;
        this.fileName = params.fileName;
        this.fileType = params.fileType;
    }
}
