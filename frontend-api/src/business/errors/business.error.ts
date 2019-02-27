export enum ErrorCode {
    // ---------------------------------------------------------------
    // - Users
    // ---------------------------------------------------------------
    EmailAlreadyExists = 1,
    EmailIsNotUnique = 2,
    NoUserForEmail = 3,
    UnableToPersistRole = 4,
    UnableToPersistUser = 5,
    // ---------------------------------------------------------------
    // - Vacations
    // ---------------------------------------------------------------
}

export class BusinessError extends Error {
    errorCode: ErrorCode;

    constructor(
        message: string,
        code: ErrorCode
    ) {
        super(message);
        this.errorCode = code;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, BusinessError.prototype);
    }
}