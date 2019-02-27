﻿import { Config } from "../../config/config.interface";

export abstract class DalConfiguration {
    public static url: string;
    public static database: string;

    public static username: string;
    public static password: string;

    public static Setup(
        config: Config
    ): void {
        this.url = `mongodb://${config.srvIPAddress}:${config.mongodbPort}`;
        this.database = config.mainDb;
        this.username = config.mainDbUsername;
        this.password = config.mainDbPassword;
    }

    public static Verify() : void {
        if (this.url === undefined || this.url.length === 0) {
            throw new Error('No url specified to access mongodb instance');
        }

        if (this.database === undefined || this.url.length === 0) {
            throw new Error('No database specified');
        }
    }

    public static SwitchDatabase(
        database: string,
        username: string,
        password: string
    ) : void {
        this.database = database;
        this.username = username;
        this.password = password;
    }
}