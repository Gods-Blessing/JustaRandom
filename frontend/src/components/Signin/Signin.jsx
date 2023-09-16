import { Link, useNavigate, redirect, Navigate } from 'react-router-dom';
import './Signin.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

let defaultValue = {
    Email:'',
    Password:'',
    Role:'',
}

export default function Signin(){
    let Nav = useNavigate();
    let {User, setUser} = useContext(UserContext);
    const [UserDetail, setUserDetail] = useState(defaultValue);
    const [error, setError] = useState(false);

    if(User){
        Nav('/');
    }

    // Handling the form change
    const HandleChange = (e)=>{
        // console.log(UserDetail);
        setUserDetail((prev)=>{
            return {...prev, [e.target.name]: e.target.value};
        });
    }

    // Handling the form Submission
    const HandleSigninSubmit = (e)=>{
        e.preventDefault();
        // console.log(UserDetail);
        axios.post(`${import.meta.env.VITE_HOST_URL}signin`, {
            ...UserDetail
        }).then((data)=>{
            // console.log(data.data.message);
            if(data.data.message.Name && data.data.message.isAuth && data.data.message.uid && data.data.message.Role){
                localStorage.setItem('user_info',
                    JSON.stringify(data.data.message)
                )
                setUser(data.data.message);
                Nav('/');
            }
        }).catch((error)=>{
            console.log(error);
            setError(true);
        })
    }


    return (
        <>
        <div className='signin-up-space'></div>
        <section className='signin-container'>
            <form action="" onSubmit={HandleSigninSubmit}>
            <p className='signin-heading'>Signin</p>
                <div>
                    <label htmlFor="">Registered Email : </label>
                    <input type="text" name='Email' onChange={HandleChange} value={UserDetail.Email} required/>
                </div>
                <div>
                    <label htmlFor="">Password : </label>
                    <input type="text" name='Password' onChange={HandleChange} value={UserDetail.Password} required/>
                </div>

                <div>
                    <label htmlFor="">Role : </label>
                    <select onChange={HandleChange} name="Role" id="" value={UserDetail.Role} required>
                        <option value="">Select the role...</option>
                        <option value="Student">Student</option>
                        <option value="Company">Company</option>
                    </select>
                </div>

                {error && <p className='error'>* Email or Password is wrong</p>}
                <button className='signin-signup-btn'>Signin</button>

                <p className='signin-signup-link'>Don't have an account? <Link to='/signup'>Signup</Link></p>
            </form>
        </section>
        </>
    )
}