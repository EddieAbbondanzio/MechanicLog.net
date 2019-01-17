
/**
 * Response from an HTTP request.
 */
export interface HttpResponse<T> {
    /**
     * The HTTP status code.
     */
    status: number;

    /**
     * The headers of the response.
     */
    headers: any;

    /**
     * The body of the response.
     */
    data: T;
}
