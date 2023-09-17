import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
    JobRole:{
        type: String,
        required: true
    },
    JobType:{
        type: String,
        required: true
    },
    Stipend:{
        type: String,
        required: true
    },
    Location:{
        type: String,
        required: true
    },
    Skills:{
        type: String,
        required: true
    },
    JobDescription:{
        type: String,
        required: true
    },
    CompanyCreated:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Company'
        }
    ,
    StudentsApplied:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Student'
        }
    ],
    ShortListedStudents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Student'
        }
    ],
    RejectedStudents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Student'
        }
    ]

}, {timestamps: true});

export const Jobs = mongoose.model('Jobs', JobsSchema);

 