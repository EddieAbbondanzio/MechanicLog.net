import { ApiService } from './api-service';
import { ApiResponse } from './api-response';
import axios from 'axios';

/**
 * Service to log in users with the back end.
 */
export class AuthService extends ApiService {
    /**
     * Log in a user using their credentials.
     * @param email The email of the user
     * @param password The password of the user.
     */
    public async login(email: string, password: string): Promise<ApiResponse<string>> {
        try {
            let result: any = await axios.post(`${this.apiUrl}/auth/login`, {
                email,
                password
            });

            return ApiResponse.success(result.status, result.data.token);
        }
        //Status codes of non 200 (401, etc...) throw errors.
        catch (error) {
            return ApiResponse.error(error.response.status, error.response.data.errorMsg);
        }
    }

    /**
     * Re login a user by validating their auth token.
     * @param authToken The JWT of the user.
     */
    public async relogin(authToken: string): Promise<ApiResponse<string>> {
        try {
            let result: any = await axios.patch(`${this.apiUrl}/auth/relogin`);
            return ApiResponse.success(result.status, authToken);
        }
        catch(error) {
            return ApiResponse.error(error.response.status, error.response.data.errorMsg);
        }
    }
}
