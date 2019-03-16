import { HttpClient } from '../http/http-client';
import { ServiceError } from '../common/errors/service-error';

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
        this._httpClient = new HttpClient({
            baseUrl,
            errorTransformer: (error: Error) => {
                return new ServiceError((error as any).response.status, (error as any).response.data.errors);
            },
        });
    }
}
