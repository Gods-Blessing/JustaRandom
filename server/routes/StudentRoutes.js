import express from 'express';
import { SignupStudent, getStudentProfile, UpdateStudentProfile, ApplyforJob, SearchStudent } from '../controller/Student.js';
import { decodeFxn } from '../config/jwt.js';

export const Studentrouter = express.Router();

// Signin
Studentrouter.post('/create/student', SignupStudent);

// get profile
Studentrouter.get('/profile', decodeFxn, getStudentProfile);

// update profile
Studentrouter.patch('/update/profile', decodeFxn, UpdateStudentProfile)

// apply for job
Studentrouter.get('/apply/job/:id', decodeFxn, ApplyforJob)


// search student user
Studentrouter.post('/search', decodeFxn, SearchStudent)