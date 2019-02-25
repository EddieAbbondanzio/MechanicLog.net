import { HttpClient } from '../http/http-client';

/**
 * Service abstraction for managing api end points.
 */
export class Service {
    /**
     * The HTTP client for communicating with the API service.
     */
    protected _httpClient: HttpClient;

    /**
     * Create a new API service.
     * @param baseUrl The base url of the service.
     */
    constructor(baseUrl: string) {
        this._httpClient = new HttpClient(baseUrl);
    }
}
