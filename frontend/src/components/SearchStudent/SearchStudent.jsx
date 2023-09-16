import axios from 'axios';
import { useContext, useState } from 'react';
import './SearchStudent.css';
import { UserContext } from '../../context/UserContext';


export default function SearchStudent(){
    let {User} = useContext(UserContext);
    const [searchValue, setSearchValue] = useState('');
    const [searchedUser, setSearchedUser] = useState();

    let handleSearchValue = (e)=>{
        setSearchValue(e.target.value)
    }

    let HandleSearchUser = (e)=>{
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_HOST_URL}student/search`,{
            searchValue
        }, {
            headers:{
                token: User.uid 
            }
        }).then((data)=>{
            if(data.status == 200){
                setSearchedUser(data.data.message)
            }
            console.log(data);
            console.log(data.status);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className='search-student-container'>
            <form className='search-input-container' onSubmit={HandleSearchUser}>
                <input type="text" onChange={handleSearchValue} value={searchValue} placeholder='Search by Email...'/>
                <button>Search</button>
            </form>

            <div>
            {searchedUser && <div className='info-div searched-user-info'>
                <div>
                    <p>Name :</p>
                    <p>{searchedUser && searchedUser.Name}</p>
                </div>

                <div>
                    <p>Email :</p>
                    <p>{searchedUser && searchedUser.Email}</p>
                </div>

                <div>
                    <p>Mobile Number :</p>
                    <p>{searchedUser && searchedUser.MobileNumber}</p>
                </div>

                <div>
                    <p>College Name :</p>
                    <p>{searchedUser && searchedUser.CollegeName}</p>
                </div>

                <div>
                    <p>Graduation Branch :</p>
                    <p>{searchedUser && searchedUser.GraduationBranch}</p>
                </div>

                <div>
                    <p>Year of Joining :</p>
                    <p>{searchedUser && searchedUser.YearOfJoining}</p>
                </div>

                <div>
                    <p>Interests :</p>
                    <p>{searchedUser && searchedUser.Interests}</p>
                </div>

                <div>
                    <p>Skills :</p>
                    <p>{searchedUser && searchedUser.Skills}</p>
                </div>

                <div>
                    <p>Bio :</p>
                    <p>{searchedUser && searchedUser.Bio}</p>
                </div>
            </div>}

            </div>
        </div>
    )
}