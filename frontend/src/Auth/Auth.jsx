import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"


export function CompanyAuth({children}){
    let Nav = useNavigate();
    let {User, setUser} = useContext(UserContext)
    return (User && User.Role === "Company") ? children : Nav('/')
}

export function StudentAuth({children}){
    let Nav = useNavigate();
    let {User, setUser} = useContext(UserContext)
    return (User && User.Role === "Student") ? children : Nav('/')
}