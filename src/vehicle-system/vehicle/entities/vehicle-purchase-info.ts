import { Nullable } from '@/core/common/monads/nullable';

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
    public purchaseDate: Date;

    /**
     * The mileage it was purchased at.
     */
    public purchaseMileage: number;

    /**
     * The price paid for the vehicle.
     */
    public purchasePrice: number;

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
    constructor(id: number, vehicleId: number, purchaseDate: Date, purchaseMileage: number, purchasePrice: number, sellerName: Nullable<string> = null) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.purchaseDate = purchaseDate;
        this.purchaseMileage = purchaseMileage;
        this.purchasePrice = purchasePrice;
        this.sellerName = sellerName;
    }

    /**
     * Rebuild the vehicle purchase info from it's raw counterpart.
     * @param raw The raw object to parse.
     */
    public static fromRaw(raw: any): VehiclePurchaseInfo {
        return new VehiclePurchaseInfo(raw.id, raw.vehicleId, new Date(raw.purchaseDate), raw.purchaseMileage, raw.purchasePrice, raw.sellerName || null);
    }
}
