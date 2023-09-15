import React, {createContext, useEffect, useState} from "react";


export const UserContext = createContext(null);


export const UserContextProvider = ({children})=>{
    const [User, setUser] = useState(null);

    useEffect(()=>{
        if(localStorage.key('user_info')){
            setUser(JSON.parse(localStorage.getItem('user_info')))
        }
    }, []);

    return(
        <UserContext.Provider value={{User, setUser}}>
            {children}
        </UserContext.Provider>
    )
}