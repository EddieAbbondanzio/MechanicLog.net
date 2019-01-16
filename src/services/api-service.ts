
/**
 * Service that interacts with the backend.
 */
export class ApiService {
    /**
     * The base url of the backend.
     */
    protected apiUrl: string;

    /**
     * Create a new API service.
     * @param apiUrl The API URL.
     */
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }
}
