import { Service } from '@/core/services/service';
import { User } from '@/user-system/entities/user';
import { HttpResponse } from '@/core/http/http-response';
import { ServiceError } from '@/core/services/service-error';
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
    public async getUserFromToken(authToken: string): Promise<Either<User, ServiceError>> {
        try {
            const response: HttpResponse = await this._httpClient.get('/user', authToken);

            return Either.left(new User(authToken, response.data.name, response.data.email, response.data.isVerified));
        } catch (error) {
            return Either.right(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }

    /**
     * Update a user's full name.
     * @param user The user to update.
     * @param newName Their new full name.
     */
    public async update(user: User): Promise<Maybe<ServiceError>> {
        try {
            await this._httpClient.patch('/user/name', { name: user.name, email: user.email }, user.authToken);
            return Maybe.none();
        } catch (error) {
            return Maybe.some(new ServiceError(error.response.status, error.response.data.errorMsg));
        }
    }
}
