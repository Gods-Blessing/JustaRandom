import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Nav from './components/Nav/Nav'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import { UserContextProvider } from './context/UserContext'
import CompanyProfile from './components/Profile/CompanyProfile/CompanyProfile'
import PostJob from './components/PostJob/PostJob'
import CompanyJobCreated from './components/CompanyJobCreated/CompanyJobCreated'
import CandidateProfile from './components/CandidateProfile/CandidateProfile'
import StudentProfile from './components/Profile/StudentProfile/StudentProfile'
import { CompanyAuth, StudentAuth } from './Auth/Auth'
import JobsforStudent from './components/JobsforStudent/JobsforStudent'
import StudentAppliedJobs from './components/StudentAppliedJobs/StudentAppliedJobs'

function App() {

  return (
    <>
    <UserContextProvider>
      <Nav/>
      <div className='spacer'></div>
        <Routes>
          <Route path='/' element={<Home/>}/>

          {/* routes for Company */}
          <Route path='/company/profile' element={
          <CompanyAuth>
            <CompanyProfile/>
          </CompanyAuth>
          }/>

          <Route path='/company/post/job' element={
          <CompanyAuth>
            <PostJob/>
          </CompanyAuth>
          }/>

          <Route path='/company/jobs/posted' element={
          <CompanyAuth>
            <CompanyJobCreated/>
          </CompanyAuth>
          }/>

          <Route path='/company/candidate/profile/:id' element={
          <CompanyAuth>
            <CandidateProfile/>
          </CompanyAuth>
          }/>


          {/* routes for Student */}
          <Route path='/student/profile' element={
          <StudentAuth>
            <StudentProfile/>
          </StudentAuth>
          }/>

          <Route path='/student/applying/jobs' element={
          <StudentAuth>
            <JobsforStudent/>
          </StudentAuth>
          }/>

          <Route path='/student/applied/jobs' element={
          <StudentAuth>
            <StudentAppliedJobs/>
          </StudentAuth>
          }/>


          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>

    </UserContextProvider>
      
    </>
  )
}

export default App
