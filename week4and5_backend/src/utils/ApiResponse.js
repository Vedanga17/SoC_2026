class ApiResponse {
    constructor(
        statusCode = 200, //send status code, by default 200.
        data, // send response data (Api response)
        message = "Success" // send success message
    ){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 // in general, above 400, status codes mean an error has occured
    }
}

export { ApiResponse };