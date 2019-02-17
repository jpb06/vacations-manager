import { Request, Response, NextFunction } from 'express';

export function extendsImplementation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // ----------------------------------------------------------------------------------------------------------------
    // Request extends
    // ----------------------------------------------------------------------------------------------------------------

    // Function to validate login arguments
    req.validateLogin = function (): boolean {
        if ((req.body.login === undefined || req.body.login === '') ||
            (req.body.password === undefined || req.body.password === '')) {
            return false;
        }

        return true;
    }

    // ----------------------------------------------------------------------------------------------------------------
    // Response extends
    // ----------------------------------------------------------------------------------------------------------------

    // Function to generate a generic response 
    res.answer = function (
        status: number,
        message: string
    ): Response {
        return res.status(status).json({
            status: status,
            message: message
        });
    }

    next();
}