import { Express, Request, Response } from "express-serve-static-core";
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { VaultService } from "rsa-vault";

import { UsersManager } from "../business/users.manager";
import { BusinessError } from "../business/errors/business.error";
import * as CryptoUtil from './../business/security/crypto.util';

import { ApplicationKeys } from "rsa-vault/typings/types.export";

const sessionDuration = 1200;

export function mapSecurityRoutes(
    app: Express
) {

    app.post('/api/login', async (
        req: Request,
        res: Response
    ) => {
        try {

            if (!req.validateLogin()) {
                return res.sendGenericError(400, 'Expecting identifiers');
            }

            let user = await UsersManager.getByEmail(req.body.login);

            let isPasswordValid = await CryptoUtil.verify(req.body.password, user.hashedPassword);
            if (isPasswordValid) {
                let keys: ApplicationKeys = await VaultService.GetKeyPair('vacations-manager');

                let expirationDate = moment().add(sessionDuration, 'seconds');

                const jwtBearerToken = jwt.sign({ guild: req.body.login }, keys.privateKey, {
                    algorithm: 'RS256',
                    expiresIn: sessionDuration
                });

                return res.status(200).json({
                    status: 200,
                    token: jwtBearerToken,
                    roles: user.roles,
                    expirationDate: JSON.stringify(expirationDate)
                });
            } else {
                return res.status(401).json({
                    status: 401,
                    data: null
                });
            }
        } catch (error) {
            if (error instanceof BusinessError) {
                return res.sendBusinessError(401, error.message, error.errorCode);
            } else {
                return res.sendGenericError(500, error.message);
            }
        }
    });
}