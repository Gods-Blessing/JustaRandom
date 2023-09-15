import { Student } from "../models/Student.model.js";
import { Company } from "../models/Company.model.js";
import { creatingToken } from "../config/jwt.js";

export const Signin = async(req,res)=>{
    console.log(req.body);
    // if role is student
    if(req.body.Role == "Student"){
        let StudentUser = await Student.findOne({Email: req.body.Email});

        if(!StudentUser){
            return res.status(404).json({
                message:"User doesn't exist"
            })
        }

        if(StudentUser.Password != req.body.Password){
            return res.status(200).json({
                message:"Password does not Match"
            })
        }

        let token = creatingToken(StudentUser.id);

        return res.status(200).json({
            message:{
                uid:token,
                isAuth: true,
                Name: StudentUser.Name,
                Role:'Student'
            }
        })
    }

    // if role is company
    if(req.body.Role == 'Company'){
        let CompanyUser = await Company.findOne({CompanyEmail: req.body.Email});

        if(!CompanyUser){
            return res.status(404).json({
                message:"User doesn't exist"
            })
        }

        if(CompanyUser.Password != req.body.Password){
            return res.status(200).json({
                message:"Password does not Match"
            });
        }

        let token = creatingToken(CompanyUser.id);
        console.log(CompanyUser);
        return res.status(200).json({
            message:{
                uid:token,
                isAuth: true,
                Name: CompanyUser.CompanyName,
                Role:'Company'
            }
        })
    }
}
