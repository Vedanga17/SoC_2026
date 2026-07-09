import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/APIerror.js';
import { Student } from '../models/student.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefreshTokens = async(studentId) => {
    try {
        const student = await Student.findById(studentId) // retrieve the student from the db and store in this variable

        const accessToken = student.generateAccessToken() 
        // generate the access token using the function call and store the generated token in the variable

        const refreshToken = student.generateRefreshToken()
        // generate the access token using the function call and store the generated token in the variable

        student.refreshToken = refreshToken // update the student's already existing refresh token with the newly generated one
        await student.save({ validateBeforeSave: false }) 
        // save the student's information. and don't validate before saving, as that is not required.

        return {accessToken, refreshToken} // return both tokens to the student.


    } catch (error) {
      // if there's an error, throw the error and log an error message.
        throw new ApiError(500, "Something went wrong while generating the refresh and access tokens")
    }
}

const registerStudent = asyncHandler(async (req, res) => {
  // key steps to be followed while registering:
  // Need to get student details from frontend (postman will do that)
  // Need to validate - check for not empty, and check for duplicate email (email should be unique)
  // If student already exists (check email), don't register again.
  // Create student object - so that we can enter the details into the database
  // don't bother sending the password in the response to the student (no point)
  // Check if the student has been successfully created or not
  // send success message/response

  const {name, roll_number, branch, semester, email, password} = req.body;

  if (name === "") {
    throw new ApiError(400, "Name cannot be empty, it is required.");
  }
  if (roll_number === "") {
    throw new ApiError(400, "Roll Number cannot be empty, it is required.");
  }
  if (branch === "") {
    throw new ApiError(400, "Branch cannot be empty, it is required.");
  }
  if (semester === "") {
    throw new ApiError(400, "Semester cannot be empty, it is required.");
  }
  if (email === "") {
    throw new ApiError(400, "Email cannot be empty, it is required.");
  }
  if (password === "") {
    throw new ApiError(400, "Password cannot be empty, it is required.");
  }

   const checkIfAlreadyExists = await Student.findOne({email});

    if (checkIfAlreadyExists) {
      throw new ApiError(400, "Student with this email already exists.")
    }

    const student = await Student.create( {
      name,
      roll_number,
      branch,
      semester,
      email, 
      password
    })

    await student.save({validateBeforeSave: false})

    const createdStudent = await Student.findById(student._id).select(
      "-password"
    )

    if (!createdStudent) {
      throw new ApiError(500, "Something went wrong during the registration")
    }

    return res.status(200).json(
      new ApiResponse(200, createdStudent, "Student registered successfully!")
    )
});

const loginStudent = asyncHandler(async(req, res) => {
  // key steps to be followed while logging in a student:
  // collect student data for validation. email will suffice, then password.
  // check if the email/username exists in the db or not. if yes, this student has been previously registered.
  // check password. if correct, let them proceed. else, ask for password again.
  // generate access and refresh tokens for them.
  // send these in the form of cookies, and thus, the user is logged in.

  const {email, password} = req.body
  if (!email) {
      throw new ApiError(400, "Email is required for login.")
  }

  const student = await Student.findOne({email});

  if (!student) {
    throw new ApiError(400, "Student with this email doesn't exist.")
  }

  const checkPassword = await student.checkPasswordValidity(password)

  if(!checkPassword) {
    throw new ApiError(401, "Password is incorrect. Try Again")
  }

  // if the password is correct, the student is successfully logged in. time to give the student his refresh and access tokens.
  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(student._id)

  // now again query the student from the database, but don't bring in his password and his refresh token, as it is not required.
  const loggedStudent = await Student.findById(student._id).select("-password -refreshToken")

  const options = {
        httpOnly: true,
        secure: true // to ensure we send safe cookies only
    }

    // now that the work is done, time to submit the response.
  return res
  .status(200) // success number
  .cookie("accessToken", accessToken, options) // return the access token through a cookie.
  .cookie("refreshToken", refreshToken, options) // return the refresh token through a cookie.
  .json(
      new ApiResponse(
          200, 
          {
            student: loggedStudent, accessToken, refreshToken // send back the updated student, and both the tokens.
          },
          "Student logged In Successfully" // print a success message.
      )
  )

});

const refreshAccessToken = asyncHandler(async(req, res) => {
    // in case a student's session has expired and they want to login again, we have created this method to generate a new 
    // access token so that they can log in.
    // NOTE: 
    // Access tokens - do not store in database, have shorter expiry time.
    // Refresh tokens - store in db, have longer expiry time. 
    // These 2 are created so that the user doesn't have to enter their login credentials again and again.

    // we store the refresh token from the student's side by accessing their cookies.
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    // usual validity check
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        // jwt.verify checks if the refresh token which came in is valid or not, by comparing with the secret key. if valid,
        // proceed further. the decodedToken variable holds the decoded data.
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        
        // as usual, query the student from the db.
        const student = await Student.findById(decodedToken?._id)
    
        if (!student) {
            throw new ApiError(401, "Invalid refresh token")
        }
        
        // if the received refresh token does not match the student's refresh token (which is in the db), throw an error.
        if (incomingRefreshToken !== student?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
        
        // generate new access and refresh tokens for the student so that they can login.
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(student._id)
        
        // after everything, return the final response.
        return res
        .status(200)
        .cookie("accessToken", accessToken, options) // send the access token.
        .cookie("refreshToken", newRefreshToken, options) // send the refresh token.
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed!"
            )
        )
    } catch (error) {
        // if there is an error anywhere, log an error message.
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

});

const logoutStudent = asyncHandler(async(req, res) => {
  // to logout a user, first we have to check whether they are logged in or not. that was done via our authenticator middleware.
  // if fine, then we proceed to logout. for that, we need to clear their access and refresh tokens, so that they can no 
  // longer access the session and will have to login again the next time they come here.

  await Student.findByIdAndUpdate(
        req.student._id, // this is the thing we want to find. from the req, we can find the _id from the student section.
        {
            $unset: {
              refreshToken: 1 // this removes the field from document. removes the refresh token.
            }
        },
        {
            new: true // the change is directly implemented into this object itself.
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    
    // return the response: here, the access and refresh token cookies have been CLEARED/DELETED.
    return res
    .status(200)
    .clearCookie("accessToken", options) // clearCookie clears out/deletes the access token.
    .clearCookie("refreshToken", options) // clearCookie clears out/deletes the refresh token.
    .json(new ApiResponse(200, {}, "User logged Out")) // no data to send, therefore empty {}.
});

const updateStudent = asyncHandler(async(req, res) => {
  // in this, we accept the new values which the student wants to set to the fields, update them in the database, and then
  // return the new user. before this, we do a validity check (by verifyJWT) and only after that is the control allowed to
  // reach here.

    const {name, semester, branch} = req.body // new values to be set into fields.

    if (!name || !semester || !branch) {
        throw new ApiError(400, "All fields are required")
    }

    const student = await Student.findByIdAndUpdate(
        req.student?._id, // we need to find the student whose details are to be updated; we do that by accessing the id.
        {
            $set: {
                name: name, // change to new value
                semester: semester, // change to new value
                branch: branch // change to new value
            }
        },
        {new: true} // update the details rightaway
        
    ).select("-password") // don't need to send back the password.

    return res
    .status(200)
    .json(new ApiResponse(200, student, "Student details updated successfully"))
})

const mostCommonBranch = asyncHandler(async (req, res) => {
  const branchStats = await Student.aggregate([
    {
      $group: {
        _id: "$branch", // groups the students by branches.
        count: { $sum: 1 } 
        // maintains a student count of each branch. for every matching student, increment by 1.

      }
    },
    {
      $sort: {
        count: -1 // sorts the branches by descending head count.
      }
    },
    {
      $limit: 1 // keeps only the top branch i.e. the one with most students.
    },
    {
      // to make our response cleaner, we choose which fields to send.
      $project: {
        _id: 0, // we don't want to send _id.
        branch: "$_id", // we rename _id to branch.
        count: 1 // keeps this (we'll submit the number of students in the most common branch)
      }
    }
  ])

  if (!branchStats.length) {
    throw new ApiError(404, "No students found")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, branchStats[0], "Most common branch fetched successfully"))
})

export { registerStudent, loginStudent, refreshAccessToken, logoutStudent, updateStudent, mostCommonBranch  };
