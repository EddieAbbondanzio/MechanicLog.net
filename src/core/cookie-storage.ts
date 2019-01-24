import store from './store/store';

/**
 * Persistance storage for storing cookies on the user's browser.
 */
export class CookieStorage {
    /**
     * Retrieve a cookie from the browser using it's unique key.
     * @param key The key to retrieve a cookie with.
     */
    public static get(key: string): any {
        /*
        *   I've created a typing for the window to include a $cookies property but
        *   Vue.js is throwing a hissy fit.
        */
        return (window as any).$cookies.get(key);
    }

    /**
     * Check if a key exists in the cookie vault.
     * @param key The key to check for.
     * @returns True if the key is in use.
     */
    public static exists(key: string): boolean {
        return (window as any).$cookies.isKey(key);
    }

    /**
     * Remove an existing cookie.
     * @param key The key of the cookie to remove.
     */
    public static clear(key: string): void {
        return (window as any).$cookies.remove(key);
    }

    /**
     * Store a cookie on the user's browser.
     * @param key The key to store the cookie under.
     * @param value The value to store in the cookie.
     * @param expiration How long the cookie should be kept for.
     */
    public static set(key: string, value: any, expiration: string | number | Date): void {
        const cookieUrl: string = (store.state as any).config.baseUrl;
        (window as any).$cookies.set(key, value, expiration, null, cookieUrl);
    }
}
