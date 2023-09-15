import { useEffect } from "react";
import { useParams } from "react-router-dom"



export default function CandidateProfile(){
    const params = useParams();
    console.log(params.id);

    useEffect(()=>{

    }, [])


    return(
        <section className="profile-container">
            <h1>Candidate Profile</h1>
            <div className='info-div'>
                <div>
                    <p>Candidate Name :</p>
                    <p>ABC</p>
                </div>

                <div>
                    <p>Candidate Email :</p>
                    <p>ABC</p>
                </div>

                <div>
                    <p>Phone Number :</p>
                    <p>ABC</p>
                </div>

                <div>
                    <p>Bio :</p>
                    <p>ABC</p>
                </div>
            </div>
            
        </section>
    )
}