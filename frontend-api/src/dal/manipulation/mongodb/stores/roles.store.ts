import { GenericStore } from './../dal.generic.store';
import { DbRole } from './../../../types/persisted.types';
import { ObjectId } from 'bson';

export abstract class RolesStore {
    private static storeName = 'roles';

    public static async create(
        role: DbRole
    ) {
        let result = await GenericStore.create(
            this.storeName,
            role
        );

        return result;
    }

    public static async getByName(
        name: string
    ) {

        let matchingRoles = await GenericStore.getBy(
            this.storeName,
            { name: name },
            {}
        ) as Array<DbRole>;

        return matchingRoles;
    }

    public static async getByIds(
        ids: ObjectId[]
    ): Promise<Array<DbRole>> {

        let result = await GenericStore.getBy(
            this.storeName,
            { _id: { $in: ids } },
            {}
        ) as Array<DbRole>;


        return result;
    }
}