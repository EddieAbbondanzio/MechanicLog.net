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
    public address: Nullable<string>;

    /**
     * The contact phone of the shop.
     */
    public phone: Nullable<string>;

    /**
     * Create a new mechanic.
     * @param id The unique ID of the mechanic.
     * @param name The name of the mechanic.
     * @param address The address of the mechanic.
     * @param phone The phone number of the mechanic.
     */
    constructor(id: number, name: string, address: string | null = null, phone: string | null = null) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    /**
     * Rebuild a mechanic entity from it's raw object counterpart.
     * @param raw The raw object from the backend.
     */
    public static fromRaw(raw: any): Mechanic {
        return new Mechanic(raw.id, raw.name, raw.address, raw.phone);
    }
}
