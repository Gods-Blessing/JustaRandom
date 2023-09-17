import { Link } from 'react-router-dom';
import './StudentJob.css'
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';


export default function StudentJob({detail}){
    let {User} = useContext(UserContext);

    const ApplyforJob = (jobid)=>{
        console.log(jobid);
        axios.get(`${import.meta.env.VITE_HOST_URL}student/apply/job/${jobid}`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className="job-container">
            <div className='individual-job-info-container'>
                <div>
                    <p>Role :</p>
                    <p>{detail.JobRole}</p>
                </div>

                <div>
                    <p>Role :</p>
                    <p>{detail.JobType}</p>
                </div>

                <div>
                    <p>Company :</p>
                    <p>{detail.CompanyCreated.CompanyName}</p>
                </div>

                <div>
                    <p>CTC / Stipend :</p>
                    <p>{detail.Stipend}</p>
                </div>

                <div>
                    <p>Skills Required :</p>
                    <p>{detail.Skills}</p>
                </div>

                <div>
                    <p>Description :</p>
                    <p>{detail.JobDescription}</p>
                </div>
            </div>
            
            <button className='apply-btn' onClick={()=>ApplyforJob(detail._id)}>Apply</button>
        </div>
    )
}