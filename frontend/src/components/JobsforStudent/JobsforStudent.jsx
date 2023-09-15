import React, {useContext, useEffect, useState, lazy, Suspense} from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
const MyJob = lazy(()=> import('./StudentJob/StudentJob'))


export default function JobsforStudent(){
    let {User} = useContext(UserContext);
    const [allJobs, setAlljobs] = useState([]);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}job/alljobs`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            console.log(data);
            setAlljobs(data.data.message)
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    return(
        <div className='jobs-container'>
            <h1>Jobs / Internships</h1>
            <div>
                {
                    allJobs.map((data, idx)=><Suspense key={idx} fallback={<h1>Loading...</h1>}>
                        <MyJob key={idx} detail={data}/>
                    </Suspense> )
                }
            </div>

        </div>
    )
}