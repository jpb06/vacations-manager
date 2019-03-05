import { Express, Request, Response } from "express-serve-static-core";
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { VaultService } from "rsa-vault";

import { UsersManager } from "../business/users.manager";
import { BusinessError } from "../business/errors/business.error";
import * as CryptoUtil from './../business/security/crypto.util';

import { ApplicationKeys } from "rsa-vault/typings/types.export";
import { User } from "../dal/types/complex.types";

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

            let user: User = await UsersManager.getByEmail(req.body.login);

            let isPasswordValid = await CryptoUtil.verify(req.body.password, user.hashedPassword);
            if (isPasswordValid) {
                let keys: ApplicationKeys = await VaultService.GetKeyPair('vacations-manager');

                const jwtBearerToken = jwt.sign({
                    sub: user.email
                }, keys.privateKey, {
                    algorithm: 'RS256',
                    expiresIn: sessionDuration
                });

                let expirationDate = moment().add(sessionDuration, 'seconds');

                return res.status(200).json({
                    status: 200,
                    token: jwtBearerToken,
                    user: {
                        lastname: user.lastname,
                        firstname: user.firstname,
                        service: user.serviceName,
                        roles: user.roles,
                    },
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