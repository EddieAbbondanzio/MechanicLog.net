import { Nullable } from '@/core/common/monads/nullable';

/**
 * Mechanic that can perform maintenance on vehicles.
 */
export class Mechanic {
    /**
     * The unique ID of the mechanic.
     */
    public id: number;

    /**
     * The name of the mechanic / shop.
     */
    public name: string;

    /**
     * The address of the shop.
     */
    public address: Nullable<string> = null;

    /**
     * The city of the address.
     */
    public city: Nullable<string> = null;

    /**
     * The State of the address.
     */
    public state: Nullable<string> = null;

    /**
     * The ZIP code of the address.
     */
    public zip: Nullable<string> = null;

    /**
     * The contact phone of the shop.
     */
    public phone: Nullable<string> = null;

    /**
     * Create a new mechanic.
     * @param name The name of the mechanic.
     */
    constructor(name: string) {
        this.id = 0;
        this.name = name;
    }

    /**
     * Rebuild a mechanic entity from it's raw object counterpart.
     * @param raw The raw object from the backend.
     */
    public static fromRaw(raw: any): Mechanic {
        const m = new Mechanic(raw.name);
        m.id = raw.id;
        m.address = raw.address;
        m.city = raw.city;
        m.zip = raw.zip;
        m.phone = raw.phone;

        return m;
    }
}
