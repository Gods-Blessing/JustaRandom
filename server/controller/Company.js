import { Company } from "../models/Company.model.js";
import {Student} from '../models/Student.model.js';
import {Jobs} from '../models/Job.model.js'


export const SignupCompany = async(req,res)=>{

    try {
        let userCompany = await Company.findOne({CompanyEmail: req.body.CompanyEmail});
    
        if(userCompany){
            return res.status(200).json({
                message: "Username already exist"
            })
        }
    
        let createCompany = await Company.create(req.body);
        
        return res.status(200).json({
            message: 'Successfull'
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Error"
        })
    }
    
}




export const CompanyProfile = async(req,res)=>{

    let CompanyUser = await Company.findById(req.userid);

    if(!CompanyUser){
        return res.status(400).json({
            message:"User doesn't exist"
        })
    }

    let copyCompany = CompanyUser.toJSON();
    delete copyCompany._id
    delete copyCompany.Password
    delete copyCompany.createdAt
    delete copyCompany.updatedAt
    delete copyCompany.__v
    // console.log("copied user-----", copyCompany);

    return res.status(200).json({
        message: copyCompany
    })
}


export const UpdateProfile = async(req,res)=>{

    let CompanyUser = await Company.findById(req.userid);

    if(CompanyUser.CompanyEmail != req.body.CompanyEmail && req.body.CompanyEmail != ''){
        CompanyUser.CompanyEmail = req.body.CompanyEmail
    }

    if(CompanyUser.CompanyContactNumber != req.body.CompanyContactNumber && req.body.CompanyContactNumber != ''){
        CompanyUser.CompanyContactNumber = req.body.CompanyContactNumber
    }

    if(CompanyUser.YearFounded != req.body.YearFounded && req.body.YearFounded != ''){
        CompanyUser.YearFounded = req.body.YearFounded
    }

    if(CompanyUser.CompanyType != req.body.CompanyType && req.body.CompanyType != ''){
        CompanyUser.CompanyType = req.body.CompanyType
    }


    if(CompanyUser.WebsiteUrl != req.body.WebsiteUrl && req.body.WebsiteUrl != ''){
        CompanyUser.WebsiteUrl = req.body.WebsiteUrl
    }

    if(CompanyUser.State != req.body.State && req.body.State != ''){
        CompanyUser.State = req.body.State
    }

    if(CompanyUser.CompanySize != req.body.CompanySize && req.body.CompanySize != ''){
        CompanyUser.CompanySize = req.body.CompanySize
    }

    if(CompanyUser.CompanyBio != req.body.CompanyBio && req.body.CompanyBio != ''){
        CompanyUser.CompanyBio = req.body.CompanyBio
    }

    await CompanyUser.save();

    let copyCompany = CompanyUser.toJSON();
    delete copyCompany._id
    delete copyCompany.Password
    delete copyCompany.createdAt
    delete copyCompany.updatedAt
    delete copyCompany.__v

    return res.status(200).json({
        message: copyCompany
    })
}


// getting all the jobs
export const getAllJobs = async(req,res)=>{
    let CompanyBio = await Company.findById(req.userid);

    if(!CompanyBio){
        return res.status(401).json({
            message:'Un-Authorised'
        })
    }

    await CompanyBio.populate('JobsCreated')
    for(let i of CompanyBio.JobsCreated){
        await i.populate('StudentsApplied', '_id Name')
    }
    // console.log(CompanyBio);

    return res.status(200).json({
        message: CompanyBio.JobsCreated
    })
}


// getting candidate profile
export const CandidateProfile = async(req,res)=>{
    // console.log(req.params);
    let Candidate = await Student.findById(req.params.id);
    // console.log(Candidate);

    let copy = Candidate.toJSON();
    delete copy.Password;
    delete copy.createdAt;
    delete copy.updatedAt;
    delete copy.__v;


    // console.log("copied =>", copy);
    return res.status(200).json({
        message: copy
    })

}

// shortlisting
export const Shortlist = async(req,res)=>{
    // console.log(req.params);
    // console.log(req.query);
    let PostedJob = await Jobs.findById(req.query.post);
    // console.log(PostedJob);
    if(!PostedJob){
        return res.status(401).json({
            message:"Post Doesn't Exist"
        })
    }
    if(!PostedJob.ShortListedStudents.includes(req.params.id)){
        PostedJob.ShortListedStudents.push(req.params.id)
        await PostedJob.save();
    }

    // console.log(PostedJob);

    return res.status(200).json({
        message: "Shortlisted"
    })
}

// rejecting candidate
export const RejectCandidate = async(req,res)=>{

    let PostedJob = await Jobs.findById(req.query.post);
    // console.log(PostedJob);
    if(!PostedJob){
        return res.status(401).json({
            message:"Post Doesn't Exist"
        })
    }

    if(!PostedJob.RejectedStudents.includes(req.params.id)){
        PostedJob.RejectedStudents.push(req.params.id)
        await PostedJob.save();
    }

    // console.log(PostedJob);

    return res.status(200).json({
        message: "Rejected"
    })
}