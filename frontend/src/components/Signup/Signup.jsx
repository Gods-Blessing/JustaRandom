import { useContext, useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { UserContext } from '../../context/UserContext';



// default value
const defaultValue = {
    Name:'',
    Email:'',
    MobileNumber:'',
    CollegeName:'',
    GraduationBranch:'',
    YearOfJoining:'',
    Interests:'',
    Skills:'',
    Bio:'',
    Password:'',
    ConfirmPassword:''
};

const defaultval = {
    CompanyName:'',
    CompanyEmail:'',
    CompanyContactNumber:'',
    YearFounded:'',
    CompanyType:'',
    WebsiteUrl:'',
    State:'',
    CompanySize:'',
    CompanyBio:'',
    Password:'',
    ConfirmPassword:''
}

export default function Signup(){
    let {User} = useContext(UserContext);
    let Nav = useNavigate();
    const [company, setCompany] = useState(true);
    const [searchJob, setSearchJob] = useState(false);
    const [jobSeekerData, setJobSeekerData] = useState(defaultValue)
    const [HirersData, setHirersData] = useState(defaultval);

    if(User){
        Nav('/');
    }

    const HandleHiring = ()=>{
        setSearchJob(false);
        setCompany(true);
    }

    const HandleSearchJob = ()=>{
        setCompany(false);
        setSearchJob(true);
    }

    const HandleJobSeekerformChange = (e)=>{
        // console.log(jobSeekerData)
        setJobSeekerData((prev)=>{
            return {...prev, [e.target.name]: e.target.value};
        })
    }

    const HandleHirersFormChange = (e)=>{
        // console.log(HirersData);
        setHirersData((prev)=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const HandleJobSubmit = async(e)=>{
        e.preventDefault();
        // console.log("submitting = >", jobSeekerData);
        axios.post(`${import.meta.env.VITE_HOST_URL}student/create/student`, {
            ...jobSeekerData
        }).then((data)=>{
            console.log(data);
            Nav('/signin');
        }).catch((error)=>{
            console.log(error);
        })
        
    }

    const HandleHirerSubmit = async(e)=>{
        e.preventDefault();
        // console.log(HirersData);

        axios.post(`${import.meta.env.VITE_HOST_URL}company/create/company`, {
            ...HirersData
        }).then((data)=>{
            console.log(data);
            Nav('/signin');
        }).catch((error)=>{
            console.log(error);
        })
        
    }


    

    return (
        <>
        <div className='signin-up-space'></div>
        <div className='signup-buttons-div'>
            <button className={`${company && "shdw-btn dark"}`} onClick={HandleHiring} >Company</button>
            <button className={`${searchJob && "shdw-btn dark"}`} onClick={HandleSearchJob}>Student</button>
        </div>

        <section className='hiree-signup-container'>

            {/* form for company */}
            {company && <form action="" onSubmit={HandleHirerSubmit}>
                <p className='signup-heading'>Company</p>

                <div>
                    <label htmlFor="">Company Name : </label>
                    <input type="text" value={HirersData.CompanyName} name='CompanyName' onChange={HandleHirersFormChange} required/>
                </div>

                <div>
                    <label htmlFor="">Company Email : </label>
                    <input type="email" value={HirersData.CompanyEmail} name='CompanyEmail' onChange={HandleHirersFormChange} required/>
                </div>

                <div>
                    <label htmlFor="">Company Contact No. : </label>
                    <input type="text" value={HirersData.CompanyContactNumber} name='CompanyContactNumber' onChange={HandleHirersFormChange} minLength='10' maxLength='10' required/>
                </div>

                <div>
                    <label htmlFor="">Year Founded : </label>
                    <input type="text" value={HirersData.YearFounded} name='YearFounded' onChange={HandleHirersFormChange} required/>
                </div>

                <div>
                    <label htmlFor="">Company Type : </label>
                    <input type="text" value={HirersData.CompanyType} name='CompanyType' onChange={HandleHirersFormChange} required placeholder='Business, Service, Online, Market...'/>
                </div>

                <div>
                    <label htmlFor="">Website Url : </label>
                    <input type="text" value={HirersData.WebsiteUrl} name='WebsiteUrl' onChange={HandleHirersFormChange} />
                </div>

                <div>
                    <label htmlFor="">State : </label>
                    <input type="text" value={HirersData.State} name='State' onChange={HandleHirersFormChange} required/>
                </div>


                <div>
                    <label htmlFor=""> Company Size : </label>
                    <select name="CompanySize" id="" value={HirersData.CompanySize} onChange={HandleHirersFormChange}>
                        <option value=""></option>
                        <option value="1-10">1-10</option>
                        <option value="10-50">10-50</option>
                        <option value="50-100">50-100</option>
                        <option value="100+">100+</option>
                    </select>
                </div>

                <div>
                    <label htmlFor=""> Short Bio : </label>
                    <textarea name="CompanyBio" id="" cols="30" rows="10" value={HirersData.CompanyBio} onChange={HandleHirersFormChange}></textarea>
                </div>

                <div>
                    <label htmlFor="">Password : </label>
                    <input type="text" className='Password' value={HirersData.Password} name='Password' onChange={HandleHirersFormChange} minLength='8' required/>
                </div>

                <div>
                    <label htmlFor="">Confirm Password : </label>
                    <input type="text" value={HirersData.ConfirmPassword} className='ConfirmPassword' name='ConfirmPassword' onChange={HandleHirersFormChange} minLength='8' required/>
                </div>

                <button className='signin-signup-btn'>Register</button>

                <p>Already have an account? <Link to='/signin'>Signin</Link></p>
            </form>}








            {/* form for job search */}

            {searchJob &&<form action="" onSubmit={HandleJobSubmit}>
                <p className='signup-heading'>Student</p>

                <div>
                    <label htmlFor="">Name : </label>
                    <input type="text" value={jobSeekerData.Name} name='Name' onChange={HandleJobSeekerformChange} required/>
                </div>

                <div>
                    <label htmlFor="">Email : </label>
                    <input type="email" name='Email' value={jobSeekerData.Email} onChange={HandleJobSeekerformChange} required/>
                </div>

                <div>
                    <label htmlFor="">Mobile Number : </label>
                    <input type="text" name='MobileNumber' value={jobSeekerData.MobileNumber} onChange={HandleJobSeekerformChange} minLength='10' maxLength='10' required/>
                </div>

                <div>
                    <label htmlFor="">College Name : </label>
                    <input type="text" name='CollegeName' value={jobSeekerData.CollegeName} onChange={HandleJobSeekerformChange} required/>
                </div>

                <div>
                    <label htmlFor="">Branch : </label>
                    <input type="text" name='GraduationBranch' value={jobSeekerData.GraduationBranch} onChange={HandleJobSeekerformChange} required/>
                </div>

                <div>
                    <label htmlFor="">Year of Joining : </label>
                    <input type="text" name='YearOfJoining' value={jobSeekerData.YearOfJoining} onChange={HandleJobSeekerformChange}  required/>
                </div>

                <div>
                    <label htmlFor="">Interests : </label>
                    <input type="text" name='Interests' value={jobSeekerData.Interests} onChange={HandleJobSeekerformChange} />
                </div>

                <div>
                    <label htmlFor="">Skills : <span>Skills should be comma seperated ie "," (Minimum - 5)</span>
                     </label>
                    <input type="text" name='Skills' value={jobSeekerData.Skills} onChange={HandleJobSeekerformChange} required/>
                </div>

                <div>
                    <label htmlFor="">Short Bio : </label>
                    <textarea name="Bio" id="" cols="30" rows="10" onChange={HandleJobSeekerformChange} value={jobSeekerData.Bio} required></textarea>
                </div>

                <div>
                    <label htmlFor="">Password : </label>
                    <input type="text" name='Password' value={jobSeekerData.Password} onChange={HandleJobSeekerformChange} minLength='8' required/>
                </div>

                <div>
                    <label htmlFor="">Confirm Password : </label>
                    <input type="text" value={jobSeekerData.ConfirmPassword} name='ConfirmPassword' onChange={HandleJobSeekerformChange} minLength='8' required/>
                </div>

                <button className='signin-signup-btn'>Register</button>

                <p>Already have an account? <Link to='/signin'>Signin</Link></p>
            </form>}
        </section>
        </>
    )
}