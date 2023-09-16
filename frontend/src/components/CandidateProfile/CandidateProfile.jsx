import './CandidateProfile.css'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";



export default function CandidateProfile(){
    let {User} = useContext(UserContext)
    const params = useParams();
    let [ParamSearch] = useSearchParams();
    const [studentInfo, setStudentInfo] = useState();

    const ShortListCandidate = ()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}company/candidate/shortlist/${params.id}/?post=${ParamSearch.get('post')}`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            console.log(data);
            // setStudentInfo(data.data.message)
        }).catch((error)=>{
            console.log(error);
        })
    }

    const RejectCandidate = ()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}company/candidate/reject/${params.id}/?post=${ParamSearch.get('post')}`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            console.log(data);
            // setStudentInfo(data.data.message)
        }).catch((error)=>{
            console.log(error);
        })
    }


    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}company/candidate/profile/${params.id}`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            setStudentInfo(data.data.message)
        }).catch((error)=>{
            console.log(error);
        })
    }, [])


    return(
        <section className="profile-container">
            <h1>Candidate Profile</h1>
            <div className='info-div'>
                <div>
                    <p>Name :</p>
                    <p>{studentInfo && studentInfo.Name}</p>
                </div>

                <div>
                    <p>Email :</p>
                    <p>{studentInfo && studentInfo.Email}</p>
                </div>

                <div>
                    <p>Mobile Number :</p>
                    <p>{studentInfo && studentInfo.MobileNumber}</p>
                </div>

                <div>
                    <p>College Name :</p>
                    <p>{studentInfo && studentInfo.CollegeName}</p>
                </div>

                <div>
                    <p>Graduation Branch :</p>
                    <p>{studentInfo && studentInfo.GraduationBranch}</p>
                </div>

                <div>
                    <p>Year of Joining :</p>
                    <p>{studentInfo && studentInfo.YearOfJoining}</p>
                </div>

                <div>
                    <p>Interests :</p>
                    <p>{studentInfo && studentInfo.Interests}</p>
                </div>

                <div>
                    <p>Skills :</p>
                    <p>{studentInfo && studentInfo.Skills}</p>
                </div>

                <div>
                    <p>Bio :</p>
                    <p>{studentInfo && studentInfo.Bio}</p>
                </div>
            </div>

            <div className="candiate-btns">
                <button onClick={ShortListCandidate}>Select</button>
                <button onClick={RejectCandidate}>Reject</button>
            </div>
            
        </section>
    )
}