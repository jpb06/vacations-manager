import debug = require('debug');
import express = require('express');
import { Express, Request, Response } from "express-serve-static-core";
import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as cors from 'cors';

import { setErrorsHandlers } from './handlers/errors.handlers';
import { mapDefaultRoutes } from './routes/default.routes';
import { mapSecurityRoutes } from './routes/security.routes';
import { extendsImplementation } from './middleware/extends.implementation.middleware';

console.log('--------------------------------------------------------------------------------');
console.log('Starting application ...');
console.log('--------------------------------------------------------------------------------');


let app: Express = express();
app.use(cors({
    //origin: 'localhost',
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
