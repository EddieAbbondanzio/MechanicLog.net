import { VueCookies } from "vue-cookies";

declare global {
    interface Window {
        /**
         * The cookies of the site.
         */
        $cookies: VueCookies;
    }
}
