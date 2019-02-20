
/**
 * Base configuration state
 */
export interface ConfigState {
    /**
     * The base url to the backend API.
     */
    apiUrl: string;

    /**
     * The base URL of the site.
     */
    baseUrl: string;

    /**
     * How long auth tokens are saved in the CookieVault
     * before they are discarded.
     */
    authTokenLifeSpan: string;
}
