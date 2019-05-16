import { Service } from '@/core/services/service';
import { Nullable } from '@/core/common/monads/nullable';
import { VehiclePurchaseInfo } from '../entities/vehicle/vehicle-purchase-info';
import { Vehicle } from '../entities/vehicle/vehicle';
import { User } from '@/user-system/entities/user';

/**
 * Service for managing vehicle purchase info records from the back end.
 */
export class VehiclePurchaseInfoService extends Service {
    public readonly type = 'vehiclePurchaseInfo';

    /**
     * Get the purchase info of a specific vehicle.
     * @param vehicle The vehicle to get the purchase info of.
     */
    public async getVehiclePurchaseInfo(vehicle: Vehicle): Promise<Nullable<VehiclePurchaseInfo>> {
        const apiResponse = await this._httpClient.get(`/v1/vehicle/${vehicle.id}/purchase-info`, User.CURRENT!.authToken);
        return VehiclePurchaseInfo.fromRaw(apiResponse.data);
    }

    /**
     * Add the purchase info of a vehicle.
     * @param vehicle The vehicle to add it to.
     * @param purchaseInfo The purchase info to add.
     */
    public async addVehiclePurchaseInfo(vehicle: Vehicle, purchaseInfo: VehiclePurchaseInfo): Promise<void> {
        const apiResponse = await this._httpClient.post(`/v1/vehicle/${vehicle.id}/purchase-info`, purchaseInfo, User.CURRENT!.authToken);
        purchaseInfo.id = apiResponse.data.id;
    }

    /**
     * Update the purchase info of a vehicle.
     * @param purchaseInfo The purchase info to update.
     */
    public async updateVehiclePurchaseInfo(purchaseInfo: VehiclePurchaseInfo): Promise<void> {
        const apiResponse = await this._httpClient.patch(`/v1/vehicle/${purchaseInfo.vehicleId}/purchase-info`, purchaseInfo, User.CURRENT!.authToken);
    }
}
