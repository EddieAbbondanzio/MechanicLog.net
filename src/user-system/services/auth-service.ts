// import axios from 'axios';
// import { UserRegistration } from '../entities/user-registration';
// import { User } from '../entities/user';
// import { UserPasswordReset } from '../entities/user-password-reset';
// import { UserPasswordUpdate } from '../entities/user-password-update';

// /**
//  * Service to log in users with the back end.
//  */
// export class AuthService extends ApiService {
//     /**
//      * Log in a user using their credentials.
//      * @param email The email of the user
//      * @param password The password of the user.
//      * @returns The issued auth token.
//      */
//     public async login(email: string, password: string): Promise<ApiResponse<string>> {
//         try {
//             const result: any = await axios.post(`${this.apiUrl}/auth/login`, {
//                 email,
//                 password,
//             });

//             return ApiResponse.success(result.status, result.data.token);
//         } catch (error) {
//             // Status codes of non 200 (401, etc...) throw errors.
//             return ApiResponse.error(error.response.status, error.response.data.errorMsg);
//         }
//     }

//     /**
//      * Re login a user by validating their auth token.
//      * @param authToken The JWT of the user.
//      * @returns The same auth token if valid.
//      */
//     public async relogin(authToken: string): Promise<ApiResponse<string>> {
//         try {
//             const result: any = await axios.patch(`${this.apiUrl}/auth/relogin`);
//             return ApiResponse.success(result.status, authToken);
//         } catch (error) {
//             return ApiResponse.error(error.response.status, error.response.data.errorMsg);
//         }
//     }

//     /**
//      * Register a new user with the site.
//      * @param userReg The user's details
//      * @returns An auth token.
//      */
//     public async register(userReg: UserRegistration): Promise<ApiResponse<string>> {
//         try {
//             const result: any = await axios.post(`${this.apiUrl}/auth/register`, userReg);
//             return ApiResponse.success(result.status, result.data.token);
//         } catch (error) {
//             return ApiResponse.error(error.response.status, error.response.data.errorMsg);
//         }
//     }


//     public async verifyEmail(user: User, emailToken: string): Promise<ApiResponse<void>> {
//         throw new Error();
//     }

//     public async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
//         throw new Error();
//     }

//     public async resetPassword(passwordReset: UserPasswordReset): Promise<ApiResponse<void>> {
//         throw new Error();
//     }

//     public async updatePassword(user: User, passwordUpdate: UserPasswordUpdate): Promise<ApiResponse<void>> {
//         throw new Error();
//     }
// }
