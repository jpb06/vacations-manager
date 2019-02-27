import { GenericStore } from './../dal.generic.store';
import { DbVacation } from './../../../types/persisted.types';

export abstract class VacationsStore {
    public static storeName = 'vacations';

    public static async create(
        vacation: DbVacation
    ): Promise<boolean> {

        let result = await GenericStore.create(
            this.storeName,
            vacation
        );

        return result;
    }

    public static async getAll(): Promise<Array<DbVacation>> {

        let result = await GenericStore.getAll(this.storeName) as Array<DbVacation>;

        return result;
    }
}