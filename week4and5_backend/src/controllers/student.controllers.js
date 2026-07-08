import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/APIerror.js';
import { Student } from '../models/student.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';


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

export { registerStudent };
