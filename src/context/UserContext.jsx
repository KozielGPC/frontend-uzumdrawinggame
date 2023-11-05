import {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [nickname, setNickname] = useState(null);
    const [roomCode, setRoomCode] = useState(null);
    const [user_id, setUserId] = useState(null);
    const [room_id, setRoomId] = useState(null);
    
    return <UserContext.Provider value={{nickname, setNickname, roomCode, setRoomCode, user_id, setUserId, room_id, setRoomId}}>
            {children}
        </UserContext.Provider>
}