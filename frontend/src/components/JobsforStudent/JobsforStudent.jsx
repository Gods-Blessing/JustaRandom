import './JobforStudent.css'
import React, {useContext, useEffect, useState, lazy, Suspense, useCallback} from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
const MyJob = lazy(()=> import('./StudentJob/StudentJob'))


export default function JobsforStudent(){
    let {User} = useContext(UserContext);
    const [allJobs, setAlljobs] = useState([]);
    const [someid, setsomeId] = useState('');
    const [filterForm, setFilterForm] = useState({JobType:'', Location:''})

    const FilterFormChange = (e)=>{
        setFilterForm((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    }


    const getallJobbs = useCallback(()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}job/alljobs/?JobType=${filterForm.JobType}&Location=${filterForm.Location}`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            setAlljobs(data.data.message)
            setsomeId(data.data.someid)
        }).catch((error)=>{
            console.log(error);
        })
    }, [filterForm])

    useEffect(()=>{
        getallJobbs();
    }, [filterForm])

    return(
        <div className='jobs-container'>
            <h1>Jobs / Internships</h1>

            {/* <div className="jobs-filter-container"> */}
                <form  action="" className='jobs-filter-container'>
                    <select onChange={FilterFormChange} name="JobType" id="" value={filterForm.JobType}>
                        <option value="">Job Type...</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                    </select>

                    <input onChange={FilterFormChange} type="text" placeholder='Location...' name='Location' value={filterForm.Location}/>
                    {/* <button>Search</button> */}
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