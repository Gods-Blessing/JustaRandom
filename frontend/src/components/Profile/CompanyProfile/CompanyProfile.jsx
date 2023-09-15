import { useContext, useEffect, useState } from 'react';
import './CompanyProfile.css';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';


export default function CompanyProfile(){
    let {User} = useContext(UserContext)
    const [showForm, setShowForm] = useState(false);
    const [companyInfo, setCompanyInfo] = useState();
    const [formInfo, setFormInfo] = useState();


    const HandleSubmit = (e)=>{
        e.preventDefault();
        axios.patch(`${import.meta.env.VITE_HOST_URL}company/update/profile`, {
            ...formInfo
        },
        {
            headers: {
                token: User.uid
            }
        }).then((data)=>{
            setCompanyInfo(data.data.message)
            setFormInfo(data.data.message)
        }).catch((error)=>{
            // console.log(error);
        })
    }

    const HandleFormChange = (e)=>{
        console.log(formInfo);
        setFormInfo((prev)=>{
            return{...prev, [e.target.name]:e.target.value}
        })
    }


    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_HOST_URL}company/profile`, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            setCompanyInfo(data.data.message)
            setFormInfo(data.data.message)
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
                    <p>Company Name :</p>
                    <p>{companyInfo && companyInfo.CompanyName}</p>
                </div>

                <div>
                    <p>Year Founded :</p>
                    <p>{companyInfo && companyInfo.YearFounded}</p>
                </div>

                <div>
                    <p>Company Type :</p>
                    <p>{companyInfo && companyInfo.CompanyType}</p>
                </div>

                <div>
                    <p>Company Email :</p>
                    <p>{companyInfo && companyInfo.CompanyEmail}</p>
                </div>

                <div>
                    <p>Phone Number :</p>
                    <p>{companyInfo && companyInfo.CompanyContactNumber}</p>
                </div>

                <div>
                    <p>Website Url :</p>
                    <p>{companyInfo && companyInfo.WebsiteUrl}</p>
                </div>

                <div>
                    <p>State :</p>
                    <p>{companyInfo && companyInfo.State}</p>
                </div>

                <div>
                    <p>Company Size :</p>
                    <p>{companyInfo && companyInfo.CompanySize}</p>
                </div>

                <div>
                    <p>Bio :</p>
                    <p>{companyInfo && companyInfo.CompanyBio}</p>
                </div>
            </div>}



            {/* form for editing profile */}
            {showForm && <form onSubmit={HandleSubmit} className='editing-form' action="">
                <div>
                    <label htmlFor="">Company Name :</label>
                    <p>{companyInfo.CompanyName}</p>
                </div>

                <div>
                    <label htmlFor="">Year Founded :</label>
                    <input type="text" name='YearFounded' value={formInfo.YearFounded} onChange={HandleFormChange}/>
                </div>

                <div>
                    <label htmlFor="">Company Type :</label>
                    <input type="text" name='CompanyType' value={formInfo.CompanyType} onChange={HandleFormChange}/>
                </div>

                <div>
                    <label htmlFor="">Company Email :</label>
                    <input type="text" name='CompanyEmail' value={formInfo.CompanyEmail} onChange={HandleFormChange}/>
                </div>

                <div>
                    <label htmlFor="">Company Contact Number :</label>
                    <input type="text" name='CompanyContactNumber' value={formInfo.CompanyContactNumber} onChange={HandleFormChange}/>
                </div>

                <div>
                    <label htmlFor="">Website Url :</label>
                    <input type="text" name='WebsiteUrl' value={formInfo.WebsiteUrl} onChange={HandleFormChange}/>
                </div>

                <div>
                    <label htmlFor="">State :</label>
                    <input type="text" name='State' value={formInfo.State} onChange={HandleFormChange}/>
                </div>

                <div>
                    <label htmlFor="">Company Size :</label>
                    <input type="text" name='CompanySize' value={formInfo.CompanySize} onChange={HandleFormChange}/>
                </div>

                <div>
                    <label htmlFor="">Bio :</label>
                    <textarea name="CompanyBio" id="" cols="30" rows="10" value={formInfo.CompanyBio} onChange={HandleFormChange}></textarea>
                </div>

                <button className='updating-btn'>Update</button>
            </form>}
        </section>
    )
}