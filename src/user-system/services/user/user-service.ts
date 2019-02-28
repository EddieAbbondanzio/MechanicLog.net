import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { HttpResponse } from '@/core/http/http-response';
import { HttpError } from '@/core/http/service-error';
import { Either } from '@/core/common/monads/either';
import { Maybe } from '@/core/common/monads/maybe';

/**
 * Service for everything related to users.
 */
export class UserService extends Service {
    /**
     * Get the logged in user's info from their auth token.
     * @param authToken The auth token in use.
     * @returns The user who owns the token.
     */
    public async getUserFromToken(authToken: string): Promise<Either<User, HttpError>> {
        const apiResponse = await this._httpClient.get('/v1/user', authToken);

        if (apiResponse.isLeft()) {
            const r = apiResponse.getLeft();
            return Either.left(new User(authToken, r.data.name, r.data.email, r.data.isVerified));
        } else {
            return Either.right(apiResponse.getRight());
        }
    }

    /**
     * Update a user's full name.
     * @param user The user to update.
     * @param newName Their new full name.
     */
    public async update(user: User): Promise<Maybe<HttpError>> {
        const apiResponse = await this._httpClient.patch('/v1/user/name', { name: user.name, email: user.email }, user.authToken);

        if (apiResponse.isLeft()) {
            return Maybe.none();
        } else {
            return Maybe.some(apiResponse.getRight());
        }
    }
}
