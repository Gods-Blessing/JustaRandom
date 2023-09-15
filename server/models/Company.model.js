import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    CompanyName:{
        type: String,
        required: true
    },
    CompanyEmail:{
        type: String,
        required: true
    },
    CompanyContactNumber:{
        type: String,
        required: true
    },
    YearFounded:{
        type: String,
        required: true
    },
    CompanyType:{
        type: String,
        required: true
    },
    WebsiteUrl:{
        type: String,
        required: true
    },
    State:{
        type: String,
        required: true
    },
    CompanySize:{
        type: String,
        required: true
    },
    CompanyBio:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    JobsCreated:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Jobs'
        }
    ]

}, {timestamps: true});

export const Company = mongoose.model('Company', CompanySchema);

 