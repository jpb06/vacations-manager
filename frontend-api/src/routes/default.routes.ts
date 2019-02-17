import { Express, Request, Response } from "express-serve-static-core";

export function mapDefaultRoutes(
    app: Express
) {

    // Root
    app.get('/', (
        req: Request,
        res: Response
    ) => {
        res.send('Nothing to see here. See /api');
    });

    // Api
    app.get('/api', (
        req: Request,
        res: Response
    ) => {
        res.send('Api root');
    });
}

