import {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState(null);
    
    return <UserContext.Provider value={{user, room, setUser, setRoom}}>
            {children}
        </UserContext.Provider>
}