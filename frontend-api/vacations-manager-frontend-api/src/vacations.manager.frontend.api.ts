import debug = require('debug');
import express = require('express');
import { Express } from "express-serve-static-core";

import { setErrorsHandlers } from './handlers/errors.handlers';
import { mapSecurityRoutes } from './routes/security.routes';

let app: Express = express();

setErrorsHandlers(app);
mapSecurityRoutes(app);

app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
