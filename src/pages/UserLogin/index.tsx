import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { useUser } from '../../hooks/useUser';
import socket from '../../components/Socket/index';

import './styles.css';

import { UserContext } from '../../context/UserContext';

export default function UserLogin() {
    const history = useHistory();

    const { nickname, setNickname, roomCode, setRoomCode, setRoomId, setUserId } = useContext(UserContext);
    const { getall, login } = useUser();
    const { join } = useRoom();

    const handleLoginButton = async (e: any) => {
        e.preventDefault();
        await Promise.resolve(login({ username: nickname }))
            .then(async (user_data) => {
                const room_data = await join({ room_code: roomCode, user_id: user_data.id });
                return { user_data, room_data };
            })
            .then(({ user_data, room_data }) => {
                setUserId(user_data.id);
                setRoomId(room_data.room.id);
                setRoomCode(roomCode);
                history.push('/home');
                socket.emit('updateRoomPlayers', room_data.room.id);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // async function login(e) {
    //     console.log(nickname, roomCode);
    //     e.preventDefault();

    //     try {

    //         // const response =
    //         const response = await api.post('user', { username: nickname });

    //         // localStorage.setItem('tokenUser', response.data.token);
    //         localStorage.setItem('nickname', nickname);
    //         localStorage.setItem('roomCode', roomCode);

    //         // socket.emit('sendMessage', { message: 'Entrou na sala', author: nickname });

    //         // history.push('/home');

    //         // socket.emit('login', { nickname: nickname, roomCode: roomCode });

    //     } catch (err) {
    //         console.log(err);
    //         alert("Este usuário ja está logado");
    //         console.log("Erro no login: " + err);
    //     }
    // }

    return (
        <div className="logon-container">
            <div className="content">
                <form onSubmit={handleLoginButton}>
                    <h1>Login</h1>
                    <input
                        placeholder="Nickname"
                        value={nickname}
                        required
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <input
                        placeholder="Room Code"
                        required
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                    <button className="button-green" type="submit">
                        Login
                    </button>
                    <Link className="button" to="/instructions">
                        How to play
                    </Link>
                </form>
            </div>
        </div>
    );
}
