import axios, { AxiosInstance } from 'axios';
import { HttpResponse } from './http-response';

/**
 * Class for making HTTP requests.
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
    public async get<T>(url: string, authToken?: string): Promise<HttpResponse<T>> {
        if (authToken != null) {
            return this._axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
            });
        } else {
            return this._axios.get(url);
        }
    }

    /**
     *  Execute a HEAD request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async head<T>(url: string, authToken?: string): Promise<HttpResponse<T>> {
        if (authToken != null) {
            return this._axios.head(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
            });
        } else {
            return this._axios.head(url);
        }
    }

    /**
     * Execute a PUT request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async put<T>(url: string, body?: any, authToken?: string): Promise<HttpResponse<T>> {
        if (authToken != null) {
            return this._axios.put(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
            });
        } else {
            return this._axios.put(url);
        }
    }

    /**
     * Execute a POST request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async post<T>(url: string, body?: any, authToken?: string): Promise<HttpResponse<T>> {
        if (authToken != null) {
            return this._axios.post(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
            });
        } else {
            return this._axios.post(url);
        }
    }

    /**
     * Execute a PATCH request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async patch<T>(url: string, body?: any, authToken?: string): Promise<HttpResponse<T>> {
        if (authToken != null) {
            return this._axios.patch(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
            });
        } else {
            return this._axios.patch(url);
        }
    }

    /**
     * Execute a DELETE request on the specified resource.
     * @param url The URL to send the request to.
     * @param authToken The JWT to authenticate with.
     * @returns The response.
     */
    public async delete<T>(url: string, body?: any, authToken?: string): Promise<HttpResponse<T>> {
        if (authToken != null) {
            return this._axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
            });
        } else {
            return this._axios.delete(url);
        }
    }
}