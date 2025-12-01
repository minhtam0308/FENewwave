import { createContext, useContext, useState } from "react";


const UserContext = createContext();

export const UserInfor = ({ children }) => {
    const [userContext, setUserContext] = useState({});
    const [imageContext, setImageContext] = useState();

    return (
        <UserContext.Provider value={{ userContext, setUserContext, imageContext, setImageContext }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}