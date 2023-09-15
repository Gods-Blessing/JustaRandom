import { Link } from 'react-router-dom';
import './Job.css';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';


export default function Job({detail}){
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
                    <p>{User && User.Name}</p>
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
        <hr />
            <div className='candidates-applied-div'>
                <h2>Candidates Applied</h2>
                <ol>
                    { detail.StudentsApplied.length > 0 ?
                        detail.StudentsApplied.map((data, idx)=>
                            <Link to={`/company/candidate/profile/${data.id}`}>
                                <li>{data}</li>
                            </Link>

                        ) : <h4>No one Applied</h4>
                    }
                    
                    
                </ol>
            </div>

        </div>
    )
}