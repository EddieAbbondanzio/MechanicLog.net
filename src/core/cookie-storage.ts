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
     * Store a cookie on the user's browser.
     * @param key The key to store the cookie under.
     * @param value The value to store in the cookie.
     * @param expiration How long the cookie should be kept for.
     */
    public static set(key: string, value: any, expiration: string | number | Date): void {
        window.$cookies.set(key, value, expiration, undefined, store.state.baseUrl, true);
    }
}
