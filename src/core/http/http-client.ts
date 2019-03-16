import axios, { AxiosInstance } from 'axios';
import { HttpResponse } from './http-response';
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
     * Transformer to pass the errors through to clean them up for
     * the handler.
     */
    private _errorTransformer?: (error: Error) => Error;

    /**
     * Create a new HTTP client.
     * @param baseUrl The base URL the HTTP client works with.
     */
    constructor(options: { baseUrl?: string; errorTransformer?: (error: Error) => Error }) {
        this._axios = axios.create({
            baseURL: options.baseUrl,
        });

        this._errorTransformer = options.errorTransformer;
    }

    /**
     * Execute a GET request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async get(url: string, authToken?: string): Promise<HttpResponse> {
        try {
            if (authToken != null) {
                return await this._axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            } else {
                return await this._axios.get(url);
            }
        } catch (error) {
            if (this._errorTransformer != null) {
                throw this._errorTransformer(error);
            } else {
                throw error;
            }
        }
    }

    /**
     *  Execute a HEAD request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async head(url: string, authToken?: string): Promise<HttpResponse> {
        try {
            if (authToken != null) {
                return await this._axios.head(url, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            } else {
                return await this._axios.head(url);
            }
        } catch (error) {
            if (this._errorTransformer != null) {
                throw this._errorTransformer(error);
            } else {
                throw error;
            }
        }
    }

    /**
     * Execute a PUT request on the specified resource.
     * @param url The URL to send the request to.
     * @param body The body of the request.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async put(url: string, body?: any, authToken?: string): Promise<HttpResponse> {
        try {
            if (authToken != null) {
                return await this._axios.put(url, body, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            } else {
                return await this._axios.put(url, body);
            }
        } catch (error) {
            if (this._errorTransformer != null) {
                throw this._errorTransformer(error);
            } else {
                throw error;
            }
        }
    }

    /**
     * Execute a POST request on the specified resource.
     * @param url The URL to send the request to.
     * @param body The body of the request.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async post(url: string, body?: any, authToken?: string): Promise<HttpResponse> {
        try {
            if (authToken != null) {
                return await this._axios.post(url, body, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            } else {
                return await this._axios.post(url, body);
            }
        } catch (error) {
            if (this._errorTransformer != null) {
                throw this._errorTransformer(error);
            } else {
                throw error;
            }
        }
    }

    /**
     * Execute a PATCH request on the specified resource.
     * @param url The URL to send the request to.
     * @param body The body of the request.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async patch(url: string, body?: any, authToken?: string): Promise<HttpResponse> {
        try {
            if (authToken != null) {
                return await this._axios.patch(url, body, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            } else {
                return await this._axios.patch(url, body);
            }
        } catch (error) {
            if (this._errorTransformer != null) {
                throw this._errorTransformer(error);
            } else {
                throw error;
            }
        }
    }

    /**
     * Execute a DELETE request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async delete(url: string, authToken?: string): Promise<HttpResponse> {
        try {
            if (authToken != null) {
                return await this._axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            } else {
                return await this._axios.delete(url);
            }
        } catch (error) {
            if (this._errorTransformer != null) {
                throw this._errorTransformer(error);
            } else {
                throw error;
            }
        }
    }
}
