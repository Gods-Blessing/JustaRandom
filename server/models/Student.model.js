import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    MobileNumber:{
        type: String,
        required: true
    },
    CollegeName:{
        type: String,
        required: true
    },
    GraduationBranch:{
        type: String,
        required: true
    },
    YearOfJoining:{
        type: String,
        required: true
    },
    Interests:{
        type: String
    },
    Skills:{
        type: String,
        required: true
    },
    Bio:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    JobsApplied:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Jobs'
        }
    ]


}, {timestamps: true});

export const Student = mongoose.model('Student', StudentSchema);

 