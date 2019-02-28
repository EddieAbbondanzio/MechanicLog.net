import { Service } from '@/core/services/service';
import { Mechanic } from '../entities/mechanic';
import { User } from '@/user-system/entities/user';
import { Nullable } from '@/core/common/monads/nullable';
import { HttpResponse } from '@/core/http/http-response';
import { HttpError } from '@/core/http/service-error';
import { Either } from '@/core/common/monads/either';
import { Maybe } from '@/core/common/monads/maybe';

/**
 * Service for retrieving, and updating vehicles from the backend.
 */
export class MechanicService extends Service {
    /**
     * Get all mechanics for a user.
     * @param user The user to get mechanics for.
     */
    public async getAllMechanicsForUser(user: User): Promise<Either<Mechanic[], HttpError>> {
        const apiResponse = await this._httpClient.get('/v1/mechanic', user.authToken);

        if (apiResponse.isLeft()) {
            return Either.left(apiResponse.getLeft().data.map((m: any) => Mechanic.fromRaw(m)));
        } else {
            return Either.right(apiResponse.getRight());
        }
    }

    /**
     * Get a specific mechanic by their ID.
     * @param user The active user.
     * @param id The ID of the mechanic.
     */
    public async getMechanicById(user: User, id: number): Promise<Either<Mechanic, HttpError>> {
        const apiResponse = await this._httpClient.get(`/v1/mechanic/${id}`, user.authToken);

        if (apiResponse.isLeft()) {
            return Either.left(Mechanic.fromRaw(apiResponse.getLeft().data));
        } else {
            return Either.right(apiResponse.getRight());
        }
    }

    /**
     * Add a mechanic to a user's account.
     * @param user The active user.
     * @param mechanic The mechanic to add.
     */
    public async addMechanic(user: User, mechanic: Mechanic): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.post('/v1/mechanic', mechanic, user.authToken);

        if (apiResponse.isLeft()) {
            mechanic.id = apiResponse.getLeft().data.id;
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }

    /**
     * Update an existing mechanic for a user.
     * @param user The active user.
     * @param mechanic The mechanic to update.
     */
    public async updateMechanic(user: User, mechanic: Mechanic): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.patch(`/v1/mechanic/${mechanic.id}`, mechanic, user.authToken);

        if (apiResponse.isLeft()) {
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }

    /**
     * Delete an existing mechanic.
     * @param user The active user.
     * @param mechanic The mechanic to delete.
     */
    public async deleteMechanic(user: User, mechanic: Mechanic): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.delete(`/v1/mechanic/${mechanic.id}`, user.authToken);

        if (apiResponse.isLeft()) {
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }
}
