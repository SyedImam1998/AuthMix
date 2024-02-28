import React,{createContext} from 'react';

export const Context=createContext(null);

export const UserInfo=(props)=>{
    const [isLoggedIn,setIsLoggedIn]=React.useState(false);

    const userObj={
        isLoggedIn,
        setIsLoggedIn,
    }
    return (
        <Context.Provider value={userObj} >
            {props.children}
        </Context.Provider>
    )
}