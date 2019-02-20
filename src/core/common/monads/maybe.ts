import { Nullable } from './nullable';

/**
 * Maybe monad for functions that might not return nothing.
 */
export class Maybe<T> {
    private _value: Nullable<T>;

    constructor(value: Nullable<T>) {
        this._value = value;
    }

    /**
     * Fold the value of the maybe.
     */
    public getSome(): T {
        if (this._value == null) {
            throw new Error('No value to retrieve');
        }

        return this._value;
    }

    /**
     * Get the value from the maybe, or the default if none.
     * @param val The default value to return if empty.
     */
    public getSomeOrdefault(val: T): T {
        if (this._value == null) {
            return val;
        } else {
            return this._value;
        }
    }

    /**
     * Check if the maybe has a value in it, or not.
     */
    public hasSome(): boolean {
        return this._value != null;
    }

    /**
     * Create a new populated maybe.
     * @param value The value in the maybe.
     */
    public static some<T>(value: T): Maybe<T> {
        return new Maybe(value);
    }

    /**
     * Create a new empty maybe.
     */
    public static none<T>(): Maybe<T> {
        return new Maybe<T>(null);
    }
}
