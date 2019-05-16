/**
 * A picture resource such as a jpg, or png.
 */
export interface Picture {
    /**
     * The content of the picture in data uri format.
     */
    data: string;

    /**
     * The filename of the picture.
     */
    fileName: string;

    /**
     * The file extension of the picture.
     */
    fileType: string;
}
