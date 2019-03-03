import { Nullable } from '@/core/common/monads/nullable';
import { MechanicType } from './mechanic-type';

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
     * The type of mechanic they are.
     */
    public type: MechanicType;

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
    constructor(name: string, type: MechanicType) {
        this.id = 0;
        this.name = name;
        this.type = type;
    }

    /**
     * Rebuild a mechanic entity from it's raw object counterpart.
     * @param raw The raw object from the backend.
     */
    public static fromRaw(raw: any): Mechanic {
        const m = new Mechanic(raw.name, raw.type);
        m.id = raw.id;
        m.address = raw.address;
        m.city = raw.city;
        m.state = raw.state;
        m.zip = raw.zip;
        m.phone = raw.phone;

        return m;
    }

    /**
     * Rebuild a mechanic from it's raw input object counterpart.
     * @param inputObj The input object to rebuild from.
     */
    public static fromInput(input: any): Mechanic {
        const m = new Mechanic(input.name, input.type);

        m.phone = input.phone !== '' ? input.phone : null;
        m.address = input.address !== '' ? input.address : null;
        m.city = input.city !== '' ? input.city : null;
        m.state = input.state !== '' ? input.state : null;
        m.zip = input.zip !== '' ? input.zip : null;

        return m;
    }
}
