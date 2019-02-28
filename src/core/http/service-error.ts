import * as HttpStatusCode from 'http-status-codes';

/**
 * An error from the backend.
 */
export class HttpError extends Error {
    /**
     * The HTTP status code returned by the API.
     */
    public httpStatusCode: number;

    /**
     * Create a new API Error.
     * @param statusCode The HTTP status code of the error.
     * @param errorMsg The human readable (hopefully) error message.
     */
    constructor(statusCode: number, errorMsg: string) {
        super(errorMsg);
        this.httpStatusCode = statusCode;
    }
}
