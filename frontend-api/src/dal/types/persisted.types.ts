import { Payload, VacationValidation } from './embedded.types';
import { ObjectId } from 'bson';

/* ---------------------------------------------------------------------------------------------------------------
   Users collection
   ---------------------------------------------------------------------------------------------------------------*/
export class DbUser {
    _id: ObjectId;
    roles: Array<ObjectId>; // reference(Roles)

    lastname: string;
    firstname: string;
    email: string;
    hashedPassword: string;
    serviceName: string;
}

/* ---------------------------------------------------------------------------------------------------------------
   Sessions collection
   ---------------------------------------------------------------------------------------------------------------*/
export class DbSession {
    _id: ObjectId;

    payload: Payload;
    userId: ObjectId; // reference(User)

    signingDate: string;
    expirationDate: string;
}

/* ---------------------------------------------------------------------------------------------------------------
   Vacations collection
   ---------------------------------------------------------------------------------------------------------------*/
export class DbVacation {
    _id: ObjectId;

    validation: VacationValidation;
    vacationerId: ObjectId; // reference(User)

    dateStart: string;
    dateEnd: string;
    description: string;
    serviceName: string;
}

/* ---------------------------------------------------------------------------------------------------------------
   Roles collection
   ---------------------------------------------------------------------------------------------------------------*/
export class DbRole {
    _id: ObjectId;

    name: string;
}
