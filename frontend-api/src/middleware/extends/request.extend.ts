declare namespace Express {

    // This interface is used to declare extension methods on the Express Request object.
    // The implementations can be found in ./src/middleware/extends.implementation.middleware
    export interface Request {
        // Function to validate login arguments
        validateLogin: () => boolean;
    }
}