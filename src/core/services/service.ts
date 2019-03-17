import { HttpClient } from '../http/http-client';
import { ServiceError } from '../common/errors/service-error';
import * as HttpStatusCodes from 'http-status-codes';
import { ValidationError } from '../common/errors/validation-error';
import { SubscriptionExpiredError } from '../common/errors/subscription-expired-error';
import { AuthenticationError } from '../common/errors/authentication-error';

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
            errorParser: (error: Error) => {
                switch ((error as any).response.status) {
                    case HttpStatusCodes.UNAUTHORIZED:
                        return new AuthenticationError();
                    case HttpStatusCodes.NOT_ACCEPTABLE:
                        return new ValidationError((error as any).response.data.errors);
                    case HttpStatusCodes.PAYMENT_REQUIRED:
                        return new SubscriptionExpiredError();
                    default:
                        return new ServiceError((error as any).response.status, (error as any).response.data.errors);
                }
            },
        });
    }
}
