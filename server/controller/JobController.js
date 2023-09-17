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
    const studentUser = await Student.findById(req.userid);
    if(!studentUser){
        return res.status(401).json({
            message:"UnAuthorized"
        })
    }

    let jobbs;

    if(req.query.Location != '' || req.query.JobType != ''){
        // filtering using aggregations
        jobbs = await Jobs.aggregate([{$match:
            {$and:[
                {Location:{$regex: req.query.Location , $options:'i'}},
                {JobType:{$regex: req.query.JobType , $options:'i'}}
            ]}},
            {
                $lookup: {
                    from: "companies",
                    localField: "CompanyCreated",
                    foreignField: "_id",
                    as: "CompanyCreated"
                }
            },
            {
                $project:{"CompanyCreated.Password":0}
            },
            {
                $unwind:"$CompanyCreated"
            }
            ])
    }else{
        jobbs = await Jobs.find({}).sort('createdAt').populate('CompanyCreated', 'CompanyName CompanyEmail CompanyContactNumber YearFounded CompanyType WebsiteUrl State CompanySize CompanyBio');
    }

    // if(jobbs.length > 0){
    //     for(let i of jobbs){
    //         await i.populate('CompanyCreated', 'CompanyName CompanyEmail CompanyContactNumber YearFounded CompanyType WebsiteUrl State CompanySize CompanyBio')
    //     }
    // }

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

    await studentUser.populate({path:'JobsApplied', populate:{path: 'CompanyCreated', select:'CompanyName'}});
    // console.log(studentUser);

    return res.status(200).json({
        message: studentUser.JobsApplied,
        someid: req.userid
    })
}


