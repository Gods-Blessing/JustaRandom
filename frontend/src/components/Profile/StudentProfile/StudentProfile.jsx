import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './StudentProfile.css';
import { UserContext } from '../../../context/UserContext';


export default function StudentProfile(){
    let {User} = useContext(UserContext)
    const [showForm, setShowForm] = useState(false);
    const [studentInfo, setStudentInfo] = useState();
    const [studentFormData, setStudentFormData] = useState();

    const HandleSubmit = (e)=>{
        e.preventDefault();
        axios.patch(`${import.meta.env.VITE_HOST_URL}student/update/profile`, {
            ...studentFormData
        },
        {
            headers: {
                token: User.uid
            }
        }).then((data)=>{
            console.log(data);
            setStudentInfo(data.data.message)
            setStudentFormData(data.data.message)
        }).catch((error)=>{
            // console.log(error);
        })
    }

    const HandleFormChange = (e)=>{
        console.log(studentFormData);
        setStudentFormData((prev)=>{
            return{...prev, [e.target.name]:e.target.value}
        })
    }
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}student/profile`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            console.log(data);
            setStudentInfo(data.data.message);
            setStudentFormData(data.data.message);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    return(
        <section className='profile-container'>
            <button className='editing-btn' onClick={()=>setShowForm(!showForm)}>
                {showForm ? 'Back' : 'Edit'}
            </button>

            {/* Company Info */}
            {!showForm && <div className='info-div'>
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
            </div>}



            {/* form for editing profile */}
            {showForm && <form className='editing-form' action="" onSubmit={HandleSubmit}>
                <div>
                    <label htmlFor="">Name :</label>
                    <p>{studentInfo.Name}</p>
                </div>

                <div>
                    <label htmlFor="">Email :</label>
                    <input type="text" name='Email' onChange={HandleFormChange} value={studentFormData.Email}/>
                </div>

                <div>
                    <label htmlFor="">Mobile Number :</label>
                    <input type="text" name='MobileNumber' onChange={HandleFormChange} value={studentFormData.MobileNumber}/>
                </div>

                <div>
                    <label htmlFor="">College Name :</label>
                    <input type="text" name='CollegeName' onChange={HandleFormChange} value={studentFormData.CollegeName}/>
                </div>

                <div>
                    <label htmlFor="">Branch :</label>
                    <input type="text" name='GraduationBranch' onChange={HandleFormChange} value={studentFormData.GraduationBranch}/>
                </div>

                <div>
                    <label htmlFor="">Year of Joining :</label>
                    <input type="text" name='YearOfJoining' onChange={HandleFormChange} value={studentFormData.YearOfJoining}/>
                </div>

                <div>
                    <label htmlFor="">Interests :</label>
                    <input type="text" name='Interests' onChange={HandleFormChange} value={studentFormData.Interests}/>
                </div>

                <div>
                    <label htmlFor="">Skills :</label>
                    <input type="text" name='Skills' onChange={HandleFormChange} value={studentFormData.Skills}/>
                </div>

                <div>
                    <label htmlFor="">Short Bio :</label>
                    <textarea name="Bio" id="" cols="30" rows="10" onChange={HandleFormChange} value={studentFormData.Bio}></textarea>
                </div>

                <button className='updating-btn'>Update</button>
            </form>}
        </section>
    )
}