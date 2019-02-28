import { BusinessError, ErrorCode } from "./errors/business.error";
import { UsersStore } from "../dal/manipulation/mongodb/stores/users.store";
import { RolesStore } from "../dal/manipulation/mongodb/stores/roles.store";
import { ObjectId } from "bson";
import { DbRole } from "../dal/types/persisted.types";
import { User } from "../dal/types/complex.types";

export abstract class UsersManager {

    public static async create(
        lastname: string,
        firstname: string,
        email: string,
        password: string,
        serviceName: string
    ): Promise<boolean> {

        // checking first if email is not already being used
        let usersWithEmail = await UsersStore.getByEmail(email);
        if (usersWithEmail.length > 0) {
            throw new BusinessError(`The email ${email} is already used`, ErrorCode.EmailAlreadyExists);
        }

        // mapping roles: creating default user role if it doesn't exist
        let role: DbRole;
        let matchingUserRoles = await RolesStore.getByName('user');
        if (matchingUserRoles.length === 0) {
            role = {
                _id: new ObjectId(),
                name: 'user'
            };
            let result = await RolesStore.create(role);
            if (result !== true) {
                throw new BusinessError('Could not initialize default user role', ErrorCode.UnableToPersistRole);
            }
        } else {
            role = matchingUserRoles[0];
        }

        // todo = hashing mechanism
        let hashedPassword = password;

        // persisting user
        let result = await UsersStore.create({
            _id: new ObjectId(),
            roles: [role._id],

            lastname: lastname,
            firstname: firstname,
            email: email,
            hashedPassword: hashedPassword,
            serviceName: serviceName
        });

        if (result !== true) {
            throw new BusinessError(`Could not create user ${email}`, ErrorCode.UnableToPersistUser);
        }

        return true;
    }

    public static async getByEmail(
        email: string
    ): Promise<User> {

        let rawUsers = await UsersStore.getByEmail(email);

        if (rawUsers.length === 0) {
            throw new BusinessError(`No existing user for email ${email}`, ErrorCode.NoUserForEmail);
        } else if (rawUsers.length > 1) {
            throw new BusinessError(`Several users found with email ${email}`, ErrorCode.EmailIsNotUnique);
        }

        let user = rawUsers[0];
        let rawRoles = await RolesStore.getByIds(user.roles);

        return {
            id: user._id,
            roles: user.roles.map((id: ObjectId) => {
                return {
                    _id: id,
                    name: (<DbRole>rawRoles.find(el => el._id.equals(id))).name
                };
            }),
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            hashedPassword: user.hashedPassword,
            serviceName: user.serviceName
        };
    }
}