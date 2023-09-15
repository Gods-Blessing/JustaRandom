import express from 'express';
import { Signin } from '../controller/CommonController.js';
import { Studentrouter } from './StudentRoutes.js';
import { Companyrouter } from './CompanyRoutes.js';
import { Jobrouter } from './JobRoutes.js';

export const router = express.Router();

// Signin
router.post('/signin', Signin);

// student
router.use('/student', Studentrouter);

// company
router.use('/company', Companyrouter);

// job
router.use('/job', Jobrouter);
