import axios, { AxiosInstance } from 'axios';
import { HttpResponse } from './http-response';
import { HttpError } from './service-error';
import { Either } from '../common/monads/either';

/**
 * Client for making HTTP requests.
 */
export class HttpClient {
    /**
     * The underlying Axios instance.
     */
    private _axios: AxiosInstance;

    /**
     * Create a new HTTP client.
     * @param baseUrl The base URL the HTTP client works with.
     */
    constructor(baseUrl?: string) {
        this._axios = axios.create({
            baseURL: baseUrl,
        });
    }

    /**
     * Execute a GET request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async get(url: string, authToken?: string): Promise<Either<HttpResponse, HttpError>> {
        try {
            if (authToken != null) {
                return Either.left(
                    await this._axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    })
                );
            } else {
                return Either.left(await this._axios.get(url));
            }
        } catch (error) {
            return Either.right(new HttpError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     *  Execute a HEAD request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async head(url: string, authToken?: string): Promise<Either<HttpResponse, HttpError>> {
        try {
            if (authToken != null) {
                return Either.left(
                await this._axios.head(url, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }));
            } else {
                return Either.left(await this._axios.head(url));
            }
        } catch (error) {
            return Either.right(new HttpError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Execute a PUT request on the specified resource.
     * @param url The URL to send the request to.
     * @param body The body of the request.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async put(url: string, body?: any, authToken?: string): Promise<Either<HttpResponse, HttpError>> {
        try {
            if (authToken != null) {
                return Either.left(await this._axios.put(url, body, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }));
            } else {
                return Either.left(await this._axios.put(url, body));
            }
        } catch (error) {
            return Either.right(new HttpError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Execute a POST request on the specified resource.
     * @param url The URL to send the request to.
     * @param body The body of the request.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async post(url: string, body?: any, authToken?: string): Promise<Either<HttpResponse, HttpError>> {
        try {
            if (authToken != null) {
                return Either.left(await this._axios.post(url, body, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }));
            } else {
                return Either.left(await this._axios.post(url, body));
            }
        } catch (error) {
            return Either.right(new HttpError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Execute a PATCH request on the specified resource.
     * @param url The URL to send the request to.
     * @param body The body of the request.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async patch(url: string, body?: any, authToken?: string): Promise<Either<HttpResponse, HttpError>> {
        try {
            if (authToken != null) {
                return Either.left(await this._axios.patch(url, body, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }));
            } else {
                return Either.left(await this._axios.patch(url, body));
            }
        } catch (error) {
            return Either.right(new HttpError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Execute a DELETE request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async delete(url: string, authToken?: string): Promise<Either<HttpResponse, HttpError>> {
        try {
            if (authToken != null) {
                return Either.left(await this._axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }));
            } else {
                return Either.left(await this._axios.delete(url));
            }
        } catch (error) {
            return Either.right(new HttpError(error.response.status, error.response.data.errorMsg));
        }
    }
}
