import express from 'express';
import { decodeFxn } from '../config/jwt.js';
import { CreateJob, AllJobs, AppliedJobs} from '../controller/JobController.js';


export const Jobrouter = express.Router();

Jobrouter.post('/create', decodeFxn, CreateJob)

Jobrouter.get('/alljobs', decodeFxn, AllJobs);

Jobrouter.get('/applied/alljobs', decodeFxn, AppliedJobs);

// Jobrouter.get('/filter', decodeFxn, FilteringJobs);