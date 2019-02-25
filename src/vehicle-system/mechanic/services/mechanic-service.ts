import { Service } from '@/core/services/service';
import { Mechanic } from '../entities/mechanic';
import { User } from '@/user-system/entities/user';
import { Nullable } from '@/core/common/monads/nullable';
import { HttpResponse } from '@/core/http/http-response';

/**
 * Service for retrieving, and updating vehicles from the backend.
 */
export class MechanicService extends Service {
    /**
     * Get all mechanics for a user.
     * @param user The user to get mechanics for.
     */
    public async getAllMechanicsForUser(user: User): Promise<Mechanic[]> {
        try {
            const response: HttpResponse = await this._httpClient.get('/mechanic', user.authToken);
            return response.data.map((m: any) => Mechanic.fromRaw(m));
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Get a specific mechanic by their ID.
     * @param user The active user.
     * @param id The ID of the mechanic.
     */
    public async getMechanicById(user: User, id: number): Promise<Nullable<Mechanic>> {
        try {
            const response: HttpResponse = await this._httpClient.get(`/mechanic/${id}`, user.authToken);
            return Mechanic.fromRaw(response.data);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Add a mechanic to a user's account.
     * @param user The active user.
     * @param mechanic The mechanic to add.
     */
    public async addMechanic(user: User, mechanic: Mechanic): Promise<void> {
        try {
            const response: HttpResponse = await this._httpClient.post('/mechanic', mechanic, user.authToken);
            mechanic.id = response.data.id;
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Update an existing mechanic for a user.
     * @param user The active user.
     * @param mechanic The mechanic to update.
     */
    public async updateMechanic(user: User, mechanic: Mechanic): Promise<void> {
        try {
            await this._httpClient.patch(`/mechanic/${mechanic.id}`, mechanic, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }

    /**
     * Delete an existing mechanic.
     * @param user The active user.
     * @param mechanic The mechanic to delete.
     */
    public async deleteMechanic(user: User, mechanic: Mechanic): Promise<void> {
        try {
            await this._httpClient.delete(`/mechanic/${mechanic.id}`, user.authToken);
        } catch (error) {
            throw new Error(error.response.data.errorMsg);
        }
    }
}
