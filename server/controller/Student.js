import { Student } from "../models/Student.model.js"

import {Jobs} from '../models/Job.model.js'


// creating the Student
export const SignupStudent = async(req,res)=>{

    try {
        let userStudent = await Student.findOne({Email: req.body.Email});
    
        if(userStudent){
            return res.status(200).json({
                message: "Username already exist"
            })
        }
    
        let createStudent = await Student.create(req.body);
        
        return res.status(200).json({
            message: 'Successfull'
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Error"
        })
    }
    
}

// getting user profile
export const getStudentProfile = async(req,res)=>{
    let foundStudent = await Student.findById(req.userid);
    if(!foundStudent){
        return res.status(401).json({
            message: 'User not found'
        })
    }

    // console.log(foundStudent);
    let copyStudent = foundStudent.toJSON();
    delete copyStudent._id;
    delete copyStudent.Password
    delete copyStudent.createdAt
    delete copyStudent.updatedAt
    delete copyStudent.__v

    // console.log(copyStudent);

    return res.status(200).json({
        message: copyStudent
    })
}

// update profile
export const UpdateStudentProfile = async(req,res)=>{
    // console.log(req.body);
    let StudentUser = await Student.findById(req.userid);
    // console.log(StudentUser);
    // console.log(req.userid);

    if(StudentUser.Email != req.body.Email && req.body.Email != ''){
        StudentUser.Email = req.body.Email
    }

    if(StudentUser.MobileNumber != req.body.MobileNumber && req.body.MobileNumber != ''){
        StudentUser.MobileNumber = req.body.MobileNumber
    }

    if(StudentUser.CollegeName != req.body.CollegeName && req.body.CollegeName != ''){
        StudentUser.CollegeName = req.body.CollegeName
    }

    if(StudentUser.GraduationBranch != req.body.GraduationBranch && req.body.GraduationBranch != ''){
        StudentUser.GraduationBranch = req.body.GraduationBranch
    }

    if(StudentUser.YearOfJoining != req.body.YearOfJoining && req.body.YearOfJoining != ''){
        StudentUser.YearOfJoining = req.body.YearOfJoining
    }

    if(StudentUser.Interests != req.body.Interests && req.body.Interests != ''){
        StudentUser.Interests = req.body.Interests
    }

    if(StudentUser.Skills != req.body.Skills && req.body.Skills != ''){
        StudentUser.Skills = req.body.Skills
    }

    if(StudentUser.Bio != req.body.Bio && req.body.Bio != ''){
        StudentUser.Bio = req.body.Bio
    }

    await StudentUser.save();

    let copyStudent = StudentUser.toJSON();
    delete copyStudent._id;
    delete copyStudent.Password
    delete copyStudent.createdAt
    delete copyStudent.updatedAt
    delete copyStudent.__v

    // console.log(copyStudent);/

    return res.status(200).json({
        message: copyStudent
    })
}

// apply for job
export const ApplyforJob = async(req,res)=>{
    // console.log(req.userid);
    // console.log("post id ", req.params);
    let StudentUser = await Student.findById(req.userid);
    // console.log(StudentUser);

    let foundJob = await Jobs.findById(req.params.id)

    if(!StudentUser.JobsApplied.includes(foundJob.id)){
        StudentUser.JobsApplied.push(foundJob.id);
        await StudentUser.save()
    }

    if(!foundJob.StudentsApplied.includes(StudentUser.id)){
        foundJob.StudentsApplied.push(StudentUser.id);
        await foundJob.save()
    }

    return res.status(200).json({
        message:foundJob
    })
}



// get searched student
export const SearchStudent = async(req,res)=>{
    let emaill = req.body.searchValue.toLowerCase();
    console.log(emaill);
    let searchedUser = await Student.findOne({Email: emaill})

    if(!searchedUser){
        return res.status(401).json({
            message: "No user Exist"
        })
    }

    let copyUser = searchedUser.toJSON();
    delete copyUser._id;
    delete copyUser.Password
    delete copyUser.createdAt
    delete copyUser.updatedAt
    delete copyUser.__v

    return res.status(200).json({
        message: copyUser
    })
}