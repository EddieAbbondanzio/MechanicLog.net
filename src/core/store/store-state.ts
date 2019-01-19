import { UserState } from '@/user-system/store/user/user-state';
import { ConfigState } from './config/config-state';

/**
 * Root state of the Vuex store.
 */
export interface StoreState {
    /**
     * The base URL of the site.
     */
    baseUrl: string;

    /**
     * The version of the front end.
     */
    version: string;
}
