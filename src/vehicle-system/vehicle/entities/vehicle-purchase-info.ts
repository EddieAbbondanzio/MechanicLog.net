import { Nullable } from '@/core/common/monads/nullable';
import { DateUtils } from '@/core/common/utils/date-utils';

export class VehiclePurchaseInfo {
    /**
     * The unique id of the purchase info
     */
    public id: number;

    /**
     * The ID of the vehicle it belongs to.
     */
    public vehicleId: number;

    /**
     * The date the vehicle was purchased on.
     */
    public purchaseDate: Nullable<Date>;

    /**
     * The mileage it was purchased at.
     */
    public purchaseOdometer: Nullable<number>;

    /**
     * The price paid for the vehicle.
     */
    public purchasePrice: Nullable<number>;

    /**
     * The name of who sold it.
     */
    public sellerName: Nullable<string>;

    /**
     *
     * @param id The unique id of the purchase info.
     * @param vehicleId The unique id of the vehicle it belongs to.
     * @param purchaseDate The date of purchase.
     * @param purchaseMileage The mileage of purchase.
     * @param purchasePrice The price of purchase
     * @param sellerName The name of the seller.
     */
    constructor(
        vehicleId: number,
        purchaseDate: Nullable<Date> = null,
        purchaseMileage: Nullable<number> = null,
        purchasePrice: Nullable<number> = null,
        sellerName: Nullable<string> = null
    ) {
        this.id = 0;
        this.vehicleId = vehicleId;
        this.purchaseDate = purchaseDate;
        this.purchaseOdometer = purchaseMileage;
        this.purchasePrice = purchasePrice;
        this.sellerName = sellerName;
    }

    public clone(): VehiclePurchaseInfo {
        const c = new VehiclePurchaseInfo(this.vehicleId, this.purchaseDate, this.purchaseOdometer, this.purchasePrice, this.sellerName);
        c.id = this.id;
        return c;
    }

    /**
     * Rebuild the vehicle purchase info from it's raw counterpart.
     * @param raw The raw object to parse.
     */
    public static fromRaw(raw: any): VehiclePurchaseInfo {
        const vpi = new VehiclePurchaseInfo(raw.vehicleId, DateUtils.parse(raw.purchaseDate), raw.purchaseOdometer, raw.purchasePrice, raw.sellerName || null);
        vpi.id = raw.id;
        return vpi;
    }
}
