import './Nav.css'
import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../context/UserContext';



export default function Nav(){
    let {User, setUser} = useContext(UserContext);

    const HandleulVis = ()=>{
        setulVisibilty(!ulVisibilty);
    }

    
    return (
        <nav className='nav-container'>
            <div className='site-info'>
                <h1>Site</h1>
            </div>

            <ul className='other-links'>
                <Link to='/'><li>Home</li></Link>

                {/* Routes for Company */}
                {(User && User.Role === 'Company')  && <>
                <Link to='/company/profile'><li>Profile</li></Link>

                <Link to='/company/post/job'><li>Post Job/Internship</li></Link>

                <Link to='/company/jobs/posted'><li>Jobs Posted</li></Link>
                </>}

                {/* student routes */}
                {(User && User.Role === 'Student') && <>
                    <Link to='/student/profile'><li>Profile</li></Link>
                    <Link to='/student/applying/jobs'><li>Jobs</li></Link>
                    <Link to='/student/profile'><li>Applied</li></Link>
                </>}
            </ul>

            {/* <input className='search-input' type="text" /> */}

            <div className='home-auth-btns'>
                <Link to='/signin'>
                    <button>Signin</button>
                </Link>

                <Link to='/signup'>
                    <button>Signup</button>
                </Link>
            </div>


        </nav>
    )
}