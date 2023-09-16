import { Company } from "../models/Company.model.js";
import { Jobs } from "../models/Job.model.js";
import { Student } from "../models/Student.model.js";

// create Job
export const CreateJob = async(req,res)=>{

    let CompanyCrtJob = await Company.findById(req.userid);

    if(!CompanyCrtJob){
        return res.status(401).json({
            message: 'User is not allowed to create job'
        })
    }

    let createdJob = await Jobs.create(req.body);
    CompanyCrtJob.JobsCreated.push(createdJob._id);
    await CompanyCrtJob.save();
    createdJob.CompanyCreated = CompanyCrtJob.id;
    await createdJob.save();

    return res.status(200).json({
        message: 'Successfully created'
    })
}


// all jobs
export const AllJobs = async(req,res)=>{
    const studentUser = await Student.findById(req.userid).sort('createdAt');
    if(!studentUser){
        return res.status(401).json({
            message:"UnAuthorized"
        })
    }

    let jobbs = await Jobs.find({});
    for(let i of jobbs){
        await i.populate('CompanyCreated')
    }
    // console.log(jobbs);

    return res.status(200).json({
        message: jobbs,
        someid: req.userid
    })
}



// Applied Jobs
export const AppliedJobs = async(req,res)=>{
    const studentUser = await Student.findById(req.userid);
    if(!studentUser){
        return res.status(401).json({
            message:"UnAuthorized"
        })
    }

    await studentUser.populate('JobsApplied');
    // console.log(studentUser);

    return res.status(200).json({
        message: studentUser.JobsApplied,
        someid: req.userid
    })
}