import { useContext } from 'react'
import Nav from '../Nav/Nav'
import './Home.css'
import { UserContext } from '../../context/UserContext'



export default function Home(){
    const {User, setUser} = useContext(UserContext);

    // console.log(import.meta.env.VITE_HOST_URL);

    return(
        <>
            <section>
                <h1>Home</h1>
            </section>
        </>
    )
}