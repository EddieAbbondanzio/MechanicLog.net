/**
 * An error from an API service.
 */
export class ServiceError extends Error {
    /**
     * The status coe of the service response
     * that created the erorr.
     */
    public statusCode: number;

    /**
     * The list of errors that went wrong.
     */
    public errorList: string[];

    /**
     * Create a new service error.
     * @param statusCode The HTTP status code.
     * @param errors The error messages.
     */
    constructor(statusCode: number, errors: string[]) {
        super(errors.join(' '));
        this.statusCode = statusCode;
        this.errorList = errors;
    }
}
