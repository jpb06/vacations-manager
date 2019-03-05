declare namespace Express {
    // This interface is used to declare extension methods on the Express Response object.
    // The implementations can be found in ./src/middleware/extends.implementation.middleware
    export interface Response {
        // Function to generate a generic response 
        sendGenericError: (status: number, message: string) => Response;
        sendBusinessError: (status: number, message: string, code: number) => Response;
    }
}