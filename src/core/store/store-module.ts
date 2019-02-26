import { StoreModuleNamespace } from './store-module-namespace';

/**
 * A store module holds state specific to a feature, or portion
 * of the web app.
 */
export abstract class StoreModule {
    /**
     * The namespace of the store module.
     */
    public readonly abstract namespace: StoreModuleNamespace;
}
