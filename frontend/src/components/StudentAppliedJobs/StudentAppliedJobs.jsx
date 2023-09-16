import { lazy, Suspense, useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

let MyJob = lazy(()=> import('./AppliedJob/AppliedJob'));


export default function StudentAppliedJobs(){
    let {User} = useContext(UserContext);
    const [allJobs, setAlljobs] = useState([]);
    const [someid, setsomeId] = useState('');

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}job/applied/alljobs`, {
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
            <h1>Applied Jobs / Internships</h1>
            <div>
                {
                    allJobs.map((data, idx)=><Suspense key={idx} fallback={<h1>Loading...</h1>}>
                        <MyJob key={idx} detail={data} someid={someid}/>
                    </Suspense> )
                }
            </div>

        </div>
    )
}