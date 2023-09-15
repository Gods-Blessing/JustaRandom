import { useContext, useState } from 'react'
import './PostJob.css'

import axios from 'axios';
import { UserContext } from '../../context/UserContext';


export default function PostJob(){
    let {User} = useContext(UserContext)
    const [jobData, setJobData] = useState({
        JobRole:'',
        Stipend:'',
        Location:'',
        Skills:'',
        JobDescription:''
    });

    const HandleJobFormChange = (e)=>{
        setJobData((prev)=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const HandleSubmitForm = (e)=>{
        e.preventDefault();
        console.log(jobData);
        axios.post(`${import.meta.env.VITE_HOST_URL}job/create`, {
            ...jobData
        },
        {
            headers: {
                token: User.uid
            }
        }).then((data)=>{
            console.log(data);
            if(data.status == 200){
                setJobData({
                    JobRole:'',
                    Stipend:'',
                    Location:'',
                    Skills:'',
                    JobDescription:''
                })
            }
        }).catch((error)=>{
            // console.log(error);
        })
    }



    return(
        <div className='job-creating-container'>
            <form action="" onSubmit={HandleSubmitForm}>
                <p className='job-form-heading'>Post Job</p>
                <div>
                    <label htmlFor="">Job Role :</label>
                    <input onChange={HandleJobFormChange} type="text" name="JobRole" value={jobData.JobRole} required/>
                </div>

                <div>
                    <label htmlFor="">Stipend :</label>
                    <input onChange={HandleJobFormChange} type="text" name="Stipend" value={jobData.Stipend} required/>
                </div>

                <div>
                    <label htmlFor="">Location :</label>
                    <input onChange={HandleJobFormChange} type="text" name="Location" value={jobData.Location} required/>
                </div>

                <div>
                    <label htmlFor="">Skills Required :</label>
                    <input onChange={HandleJobFormChange} type="text" name="Skills" value={jobData.Skills} required/>
                </div>

                <div>
                    <label htmlFor="">Job Description :</label>
                    <textarea onChange={HandleJobFormChange} name="JobDescription" id="" cols="30" rows="10" value={jobData.JobDescription} required></textarea>
                </div>

                <button className='job-submission-btn'>Submit</button>
            </form>
        </div>
    )
}