import { lazy, useContext, useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import './CompanyJobCreated.css';
// import Job from './Job/Job';
import { UserContext } from '../../context/UserContext';

const MyJob = lazy(()=> import('./Job/Job'))



export default function CompanyJobCreated(){
    let {User} = useContext(UserContext);
    const [allJobs, setAlljobs] = useState([]);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}company/alljobs`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            setAlljobs(data.data.message)
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    return(
        <div className='jobs-container'>
            <h1>Jobs / Internships Posted</h1>
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