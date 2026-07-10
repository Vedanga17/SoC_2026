import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Student } from "../models/student.models.js";

// we want to logout, but for that we need to be logged in first. this middleware verifies if the student is currently logged in.
export const verifyJWT = async (req, res, next) => {
    try {
        // get the access tokens from the cookies (since we sent cookies in the response while logging in the student, we have
        // access to cookies in the request also).
        const token = req.cookies?.accessToken // this variable stores the access token
        
        // if no token is received, this means the student isn't logged in. throw an error.
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        // this checks if the access token of the student is valid or not by comparing against the secret key (which we have 
        // in our environment variables). this method returns an object containing the decoded data.
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        // query the student from the db using the _id given by the decoded token. do not select password and refresh token.
        const student = await Student.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!student) {     
            throw new ApiError(401, "Invalid Access Token")
        }
        
        // in the request's body, the student (with all its info) is stored in req.student for further usage.
        req.student = student;
        if (typeof next === 'function') {
            return next() // since it's a middleware, we need to pass the flow of control to the next line.
        }

        return

    } catch (error) {
        // if there's an error anywhere, just log an error message.
        if (typeof next === 'function') {
            return next(new ApiError(401, error?.message || "Invalid access token"))
        }

        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
}