import { ObjectId } from 'bson';
import { DbRole } from './persisted.types';

/* ---------------------------------------------------------------------------------------------------------------
   User = aggregation between user and roles
   ---------------------------------------------------------------------------------------------------------------*/
export class User {
    id: ObjectId;
    roles: Array<DbRole>;

    lastname: string;
    firstname: string;
    email: string;
    hashedPassword: string;
    serviceName: string;
}