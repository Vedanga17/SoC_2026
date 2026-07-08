import { Router } from 'express';
import { registerStudent } from '../controllers/student.controllers.js';

const router = Router();

// if the route received is '/register', we pass control to a POST endpoint and to 'registerStudent'.
router.route('/register').post(registerStudent);

export { router };
