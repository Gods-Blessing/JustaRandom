import express from 'express';
import { SignupCompany, CompanyProfile, UpdateProfile, getAllJobs, CandidateProfile, Shortlist, RejectCandidate } from '../controller/Company.js';
import { decodeFxn } from '../config/jwt.js';

export const Companyrouter = express.Router();

// Signin
Companyrouter.post('/create/company', SignupCompany);

Companyrouter.get('/profile', decodeFxn,CompanyProfile)

Companyrouter.patch('/update/profile',decodeFxn, UpdateProfile);

Companyrouter.get('/alljobs', decodeFxn, getAllJobs);

Companyrouter.get('/candidate/profile/:id', decodeFxn, CandidateProfile);

Companyrouter.get('/candidate/shortlist/:id', decodeFxn, Shortlist);

Companyrouter.get('/candidate/reject/:id', decodeFxn, RejectCandidate);




