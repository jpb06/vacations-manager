import * as core from "express-serve-static-core";
import express = require("express");

export function setErrorsHandlers(
    app: core.Express
): void {
    // catch 404 and forward to error handler
    app.use((
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        let err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use((
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            res.status(err['status'] || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
