import { Request, Response, NextFunction } from 'express';
import { BusinessError, ErrorCode } from '../business/errors/business.error';

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
    res.sendGenericError = function (
        status: number,
        message: string
    ): Response {
        return res.status(status).json({
            status: status,
            message: message
        });
    }

    // Function to generate a generic response from a BusinessError
    res.sendBusinessError = function (
        status: number, 
        message: string,
        code: ErrorCode
    ): Response {
        return res.status(500).json({
            status: status,
            message: message,
            code: code
        });
    }

    next();
}