import { Express, Request, Response } from "express-serve-static-core";

export function mapSecurityRoutes(app: Express) {

    app.post('/api/login', async (
        req: Request,
        res: Response
    ) => {
        try {
            if (!req.validateLogin()) {
                return res.answer(400, 'Expecting identifiers');
            }

            // do magic here
        } catch (error) {
            return res.answer(500, error.message);
        }
    });
}