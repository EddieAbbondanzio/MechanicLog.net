import { Service } from '@/core/services/service';
import { Mechanic } from '../entities/mechanic';
import { User } from '@/user-system/entities/user';

/**
 * Service for retrieving, and updating vehicles from the backend.
 */
export class MechanicService extends Service {
    /**
     * Get all mechanics for a user.
     * @param user The user to get mechanics for.
     */
    public async getAllMechanicsForUser(user: User): Promise<Mechanic[]> {
        const apiResponse = await this._httpClient.get('/v1/mechanic', user.authToken);
        return apiResponse.data.map((m: any) => Mechanic.fromRaw(m));
    }

    /**
     * Get a specific mechanic by their ID.
     * @param user The active user.
     * @param id The ID of the mechanic.
     */
    public async getMechanicById(user: User, id: number): Promise<Mechanic> {
        const apiResponse = await this._httpClient.get(`/v1/mechanic/${id}`, user.authToken);
        return Mechanic.fromRaw(apiResponse.data);
    }

    /**
     * Add a mechanic to a user's account.
     * @param user The active user.
     * @param mechanic The mechanic to add.
     */
    public async addMechanic(user: User, mechanic: Mechanic): Promise<void> {
        const apiResponse = await this._httpClient.post('/v1/mechanic', mechanic, user.authToken);
        mechanic.id = apiResponse.data.id;
    }

    /**
     * Update an existing mechanic for a user.
     * @param user The active user.
     * @param mechanic The mechanic to update.
     */
    public async updateMechanic(user: User, mechanic: Mechanic): Promise<void> {
        await this._httpClient.patch(`/v1/mechanic/${mechanic.id}`, mechanic, user.authToken);
    }

    /**
     * Delete an existing mechanic.
     * @param user The active user.
     * @param mechanic The mechanic to delete.
     */
    public async deleteMechanic(user: User, mechanic: Mechanic): Promise<void> {
        await this._httpClient.delete(`/v1/mechanic/${mechanic.id}`, user.authToken);
    }
}
