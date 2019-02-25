// import { Service } from '@/core/services/service';
// import { User } from '@/user-system/entities/user';
// import { MaintenanceEvent } from '../entities/maintenance-event';
// import { Either } from '@/core/common/monads/either';
// import { Vehicle } from '../entities/vehicle';
// import { Maybe } from '@/core/common/monads/maybe';
// import { HttpResponse } from '@/core/http/http-response';
// /**
//  * API service for getting services of vehicles.
//  */
// export class VehicleMaintenanceEventService extends Service {
//     /**
//      * Get all of the maintenance events for a vehicle.
//      * @param user The user that own's the vhicle.
//      * @param vehicle The vehicle to get all the services for.
//      */
//     public async getAllForVehicle(user: User, vehicle: Vehicle): Promise<Either<MaintenanceEvent[], string>> {
//         try {
//             const response: HttpResponse = await this._httpClient.get(`/vehicle/${vehicle.id}/maintenance`, user.authToken);
//             return Either.left([]);
//         } catch (error) {
//             return Either.right(error.response.data.errorMsg);
//         }
//     }
//     /**
//      * Add a new event to the user's vehicle.
//      * @param user The user that own's the vehicle.
//      * @param vehicle The vehicle to add it to.
//      * @param event The event to add.
//      */
//     public async addEventForVehicle(user: User, vehicle: Vehicle, event: MaintenanceEvent): Promise<Maybe<string>> {
//         try {
//             // vehicle. d = response.data.id;
//             return Maybe.none();
//         } catch (error) {
//             return Maybe.some(error.response.data.errorMsg);
//         }
//     }
//     /**
//      * Delete an existing event from the vehicle.
//      * @param user The user that own's the vehicle.
//      * @param vehicle The vehicle.
//      * @param event The event to delete.
//      */
//     public async deleteEventForVehicle(user: User, vehicle: Vehicle, event: MaintenanceEvent): Promise<Maybe<string>> {
//         try {
//             return Maybe.none();
//         } catch (error) {
//             return Maybe.some(error.response.data.errorMsg);
//         }
//     }
// }
