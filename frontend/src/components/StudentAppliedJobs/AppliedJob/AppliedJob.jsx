import './AppliedJob.css'
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";







export default function AppliedJob({detail, someid}){
    let {User} = useContext(UserContext);


    return(
        <div className="job-container">
            <div className='individual-job-info-container'>
                <div>
                    <p>Role :</p>
                    <p>{detail.JobRole}</p>
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
            
            <div>
                <h4><u>Status</u></h4>
                {(detail.StudentsApplied.includes(someid) && !detail.ShortListedStudents.includes(someid) && !detail.RejectedStudents.includes(someid)) && <p>Pending</p>}
                {detail.ShortListedStudents.includes(someid) && <p>Short Listed</p>}
                {detail.RejectedStudents.includes(someid) && <p>Rejected</p>}
            </div>
        </div>
    )
}