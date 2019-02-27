import { GenericStore } from './../dal.generic.store';
import { DbUser } from './../../../types/persisted.types';

export abstract class UsersStore {
    private static storeName = 'users';

    public static async create(
        user: DbUser
    ) : Promise<boolean> {

        let result = await GenericStore.create(
            this.storeName,
            user
        );

        return result;
    }

    public static async getAll() : Promise<Array<DbUser>> {

        let result = await GenericStore.getAll(this.storeName) as Array<DbUser>;

        return result;
    }

    public static async getByEmail(
        email: string
    ): Promise<Array<DbUser>> {

        let matchingUsers = await GenericStore.getBy(
            this.storeName,
            { email: email },
            {}
        ) as Array<DbUser>;
        
        return matchingUsers;
    }
}