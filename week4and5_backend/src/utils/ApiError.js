class ApiError extends Error { // inheritance of child ApiError from Parent Error class (default class of node.js)
    constructor(
        statusCode = 404, // send status code, by default 404.
        message= "Something went wrong", // send error message, by default this thing.
        errors = [], // store all the errors in array.
    ){
        super(message) // need to use the super keyword while writing constructor for child class.
        this.statusCode = statusCode // overwrite parent information with child information
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
    }
}

export {ApiError}; // export it.