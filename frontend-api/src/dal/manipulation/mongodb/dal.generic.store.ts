import { MongoClient } from 'mongodb';

import { DalConfiguration } from './../../configuration/dal.configuration';

export abstract class GenericStore {

    // Connection logic to mongodb, using configuration data
    private static async connect(): Promise<MongoClient> {
        DalConfiguration.Verify();

        const client = await MongoClient.connect(DalConfiguration.url, {
            auth: {
                user: DalConfiguration.username,
                password: DalConfiguration.password
            },
            useNewUrlParser: true
        });

        return client;
    }

    // if [term] does not have any match in [collectionName]
    // - inserts [value] in said collection 
    // else
    // - replaces in said collection the first matching document with [value]
    public static async createOrUpdate(
        collectionName: string,
        term: object,
        value: object
    ) : Promise<boolean> {

        const client = await this.connect();

        try {
            let db = client.db(DalConfiguration.database);
            let collection = db.collection(collectionName);

            let result = await collection.findOneAndUpdate(term, { $set: value }, { upsert: true });
            if (result.ok === 1)
                return true;
            else
                return false;
        } finally {
            client.close();
        }
    }

    // inserts [value] in [collectionName]
    public static async create(
        collectionName: string,
        value: object
    ): Promise<boolean> {

        const client = await this.connect();

        try {
            let db = client.db(DalConfiguration.database);
            let collection = db.collection(collectionName);

            let result = await collection.insertOne(value);
            if (result.result.ok === 1)
                return true;
            else
                return false;
        } finally {
            client.close();
        }
    }

    // removes all documents matching [term] in [collectionName] and inserts [values] in said collection
    public static async clearAndCreateMany(
        collectionName: string,
        term: object,
        values: Array<object>
    ) : Promise<boolean> {

        const client = await this.connect();

        try {
            let db = client.db(DalConfiguration.database);
            let collection = db.collection(collectionName);

            let deleteResult = await collection.deleteMany(term);
            let insertResult = await collection.insertMany(values);

            if (deleteResult.result.ok === 1 && insertResult.result.ok === 1) {
                return true;
            } else {
                return false;
            }

        } finally {
            client.close();
        }
    }

    // removes all documents in [collectionName] and inserts [values] in said collection
    public static async clearAllAndCreateMany(
        collectionName: string,
        values: Array<object>
    ) : Promise<boolean> {
        return await GenericStore.clearAndCreateMany(collectionName, {}, values);
    }

    // gets all documents in [collectionName]
    public static async getAll(
        collectionName: string
    ) : Promise<Array<object>> {

        const client = await this.connect();

        try {
            let db = client.db(DalConfiguration.database);
            let collection = db.collection(collectionName);

            const result = await collection.find().toArray();

            return result;
        } finally {
            client.close();
        }
    }

    // gets all documents matching [term] in [collectionName] and sorts them using [sort] object
    // see https://docs.mongodb.com/manual/reference/method/cursor.sort/#cursor.sort for [sort]
    public static async getBy(
        collectionName: string,
        term: object,
        sort: object
    ) : Promise<Array<object>> {

        const client = await this.connect();

        try {
            let db = client.db(DalConfiguration.database);
            let collection = db.collection(collectionName);

            const result = await collection
                .find(term)
                .sort(sort)
                .toArray();

            return result;
        } finally {
            client.close();
        }
    }

    // removes all documents matching [term] in [collectionName]
    public static async remove(
        collectionName: string,
        term: object
    ) : Promise<boolean> {

        const client = await this.connect();

        try {
            let db = client.db(DalConfiguration.database);
            let collection = db.collection(collectionName);

            let result = await collection.deleteOne(term);

            return result.deletedCount === 1;
        } finally {
            client.close();
        }
    }
}