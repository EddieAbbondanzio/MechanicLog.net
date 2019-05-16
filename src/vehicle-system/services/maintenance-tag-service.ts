import { Service } from '@/core/services/service';
import { MaintenanceTag } from '../entities/maintenance/maintenance-tag';
import { User } from '@/user-system/entities/user';

/**
 * Service for getting maintenance tags from the backend.
 */
export class MaintenanceTagService extends Service {
    public readonly type = 'maintenanceTag';

    /**
     * Get all of the maintenance tags available.
     */
    public async getAllMaintenanceTags(): Promise<MaintenanceTag[]> {
        const apiResponse = this._httpClient.get('/v1/maintenance-tag', User.CURRENT!.authToken);
        return ((await apiResponse).data as {}[]).map((r) => new MaintenanceTag(r));
    }
}
