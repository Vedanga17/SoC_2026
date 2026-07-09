import { Router } from 'express';
import { registerStudent } from '../controllers/student.controllers.js';
import { loginStudent } from '../controllers/student.controllers.js';
import { logoutStudent } from '../controllers/student.controllers.js';
import { refreshAccessToken } from '../controllers/student.controllers.js';
import { updateStudent } from '../controllers/student.controllers.js';
import { mostCommonBranch } from '../controllers/student.controllers.js';
import { verifyJWT } from '../middlewares/authenticator.middleware.js';

const router = Router();

// if the route received is '/register', we pass control to a POST endpoint and to 'registerStudent'.
router.route('/api/students/register').post(registerStudent);

// if the route received is '/login', we pass control to a POST endpoint and to 'loginStudent'.
router.route('/api/students/login').post(loginStudent);

// if the route received is '/refresh-token', we pass control to a POST endpoint and to 'refreshAccessToken'.
router.route('/api/students/refresh-token').post(refreshAccessToken);

// if the route received is '/logout', we first do a validity check, and pass control to a POST endpoint and to 'logoutStudent'.
router.route('/api/students/logout').post(verifyJWT, logoutStudent);

// if the route received is '/update', we first do a validity check, and pass control to a PATCH endpoint and to 'updateStudent'.
router.route('/api/students/student/update').patch(verifyJWT, updateStudent);

// if the route received is '/most-common-branch', we calculate the branch with the highest student count.
router.route('/api/students/most-common-branch').get(mostCommonBranch);

export { router };
