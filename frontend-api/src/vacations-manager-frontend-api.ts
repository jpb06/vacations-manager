import debug = require('debug');
import express = require('express');
import { Express, Request, Response } from "express-serve-static-core";
import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as cors from 'cors';

import { setErrorsHandlers } from './middleware/handlers/errors.handlers';
import { mapDefaultRoutes } from './routes/default.routes';
import { mapSecurityRoutes } from './routes/security.routes';
import { extendsImplementation } from './middleware/extends.implementation.middleware';

import * as ConfigData from './config/current.config.json';
import { Config } from './config/config.interface';
import { DalConfiguration } from './dal/configuration/dal.configuration';
import { Configuration as VaultConfiguration } from 'rsa-vault';

// first converting to unknown then to the type we want
let mainConfig = (<Config><unknown>ConfigData);
DalConfiguration.Setup(mainConfig);
VaultConfiguration.Setup(mainConfig);

console.log('--------------------------------------------------------------------------------');
console.log('Starting application ...');
console.log('--------------------------------------------------------------------------------');


let app: Express = express();
app.use(cors({
    origin: mainConfig.srvURLs,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(extendsImplementation);


mapDefaultRoutes(app);
mapSecurityRoutes(app);
setErrorsHandlers(app);

app.set('port', 3000);

let server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
