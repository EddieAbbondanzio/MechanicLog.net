import { StoreModule } from '@/core/store/store-module';
import { StoreModuleNamespace } from '@/core/store/store-module-namespace';
import { ServiceRegistry } from '@/core/services/service-registry';
import { ServiceType } from '@/core/services/service-type';
import { Dictionary } from 'vue-router/types/router';
import { Nullable } from '@/core/common/monads/nullable';
import { VehiclePurchaseInfo } from '../entities/vehicle/vehicle-purchase-info';
import { VehiclePurchaseInfoService } from '../services/vehicle-purchase-info-service';
import { Vehicle } from '../entities/vehicle/vehicle';

export class VehiclePurchaseInfoStore extends StoreModule {
    public readonly namespace: StoreModuleNamespace = 'vehiclePurchaseInfo';

    private _vehiclePurchaseInfoService: VehiclePurchaseInfoService;

    private _purchaseInfoCache: Dictionary<Nullable<VehiclePurchaseInfo>>;

    constructor() {
        super();
        this._vehiclePurchaseInfoService = ServiceRegistry.resolve(ServiceType.VehiclePurchaseInfo);
        this._purchaseInfoCache = {};
    }

    /**
     * Get the purchase info of a specific vehicle.
     * @param vehicle The vehicle to get the purchase info of.
     */
    public async getVehiclePurchaseInfo(vehicle: Vehicle): Promise<Nullable<VehiclePurchaseInfo>> {
        // Do we have it cached?
        if (this._purchaseInfoCache[vehicle.id] != null) {
            return this._purchaseInfoCache[vehicle.id];
        }

        const info = await this._vehiclePurchaseInfoService.getVehiclePurchaseInfo(vehicle);

        if (info != null) {
            this._purchaseInfoCache[vehicle.id] = info;
            return info;
        } else {
            return null;
        }
    }

    /**
     * Add the purchase info of a vehicle.
     * @param vehicle The vehicle to add it to.
     * @param purchaseInfo The purchase info to add.
     */
    public async addVehiclePurchaseInfo(vehicle: Vehicle, purchaseInfo: VehiclePurchaseInfo): Promise<void> {
        await this._vehiclePurchaseInfoService.addVehiclePurchaseInfo(vehicle, purchaseInfo);
        this._purchaseInfoCache[vehicle.id] = purchaseInfo;
    }

    /**
     * Update the purchase info of a vehicle.
     * @param purchaseInfo The purchase info to update.
     */
    public async updateVehiclePurchaseInfo(purchaseInfo: VehiclePurchaseInfo): Promise<void> {
        await this._vehiclePurchaseInfoService.updateVehiclePurchaseInfo(purchaseInfo);
        this._purchaseInfoCache[purchaseInfo.vehicleId] = purchaseInfo;
    }
}
