
/**
 * Response recieved from the backend API.
 */
export class ApiResponse<TResult> {
    /**
     * The HTTP status code returned.
     */
    public httpStatus: number;

    /**
     * The returned value of the api.
     */
    public value: TResult | null;

    /**
     * The error message (if any).
     */
    public error: string;

    /**
     * Create a new API response.
     * @param status The HTTP status.
     * @param value The return value of the API.
     * @param error The error of the API.
     */
    private constructor(status: number, value: TResult | null, error: string = '') {
        this.httpStatus = status;
        this.value = value;
        this.error = error;
    }

    /**
     * Create a new successful response.
     * @param status The HTTP status code.
     * @param value The value of the response.
     */
    public static success<TResult>(status: number, value: TResult | null = null): ApiResponse<TResult> {
        return new ApiResponse<TResult>(status, value);
    }

    /**
     * Create a new error response.
     * @param status The HTTP status code.
     * @param error The error message.
     */
    public static error<TResult>(status: number, error: string): ApiResponse<TResult> {
        return new ApiResponse<TResult>(status, null, error);
    }
}