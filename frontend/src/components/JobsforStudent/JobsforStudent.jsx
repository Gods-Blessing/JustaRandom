import './JobforStudent.css'
import React, {useContext, useEffect, useState, lazy, Suspense} from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
const MyJob = lazy(()=> import('./StudentJob/StudentJob'))


export default function JobsforStudent(){
    let {User} = useContext(UserContext);
    const [allJobs, setAlljobs] = useState([]);
    const [someid, setsomeId] = useState('');
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}job/alljobs`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            setAlljobs(data.data.message)
            setsomeId(data.data.someid)
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    return(
        <div className='jobs-container'>
            <h1>Jobs / Internships</h1>

            {/* <div className="jobs-filter-container"> */}
                <form action="" className='jobs-filter-container'>
                    <select name="JobType" id="" >
                        <option value="">Job...</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                    </select>

                    <input type="text" placeholder='Location...'/>
                    <button>Search</button>
                </form>
            {/* </div> */}

            <div>
                {
                    allJobs.map((data, idx)=> !data.StudentsApplied.includes(someid) && <Suspense key={idx} fallback={<h1>Loading...</h1>}>
                        <MyJob key={idx} detail={data}/>
                    </Suspense> )
                }
            </div>

        </div>
    )
}