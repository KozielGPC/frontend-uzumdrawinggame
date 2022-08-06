import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { useUser } from '../../hooks/useUser';
import { Room } from '../../interfaces/iRoom';
import { User } from '../../interfaces/iUser';
import socket from '../../components/Socket/index';
// import axios from 'axios';

import './styles.css';
// import api from '../../services/api';

// import socket from '../../components/Socket/index';

export default function UserLogin() {
    const [nickname, setNickname] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [room, setRoom] = useState<Room>();
    const [user, setUser] = useState<User>();
    const history = useHistory();

    const { getall, login } = useUser();
    const { join } = useRoom();

    useEffect(() => {
        getall();
    }, [getall]);

    const handleLoginButton = useCallback(
        async (e: any) => {
            e.preventDefault();
            await Promise.resolve(login({ username: nickname }))
                .then(async (user_data) => {
                    const room_data = await join({ room_code: roomCode, user_id: user_data.id });
                    setUser(user_data);
                    setRoom(room_data.room);
                    return { user_data, room_data };
                })
                .then(({ user_data, room_data }) => {
                    localStorage.setItem('nickname', nickname);
                    localStorage.setItem('user_id', user_data.id);
                    localStorage.setItem('roomCode', roomCode);
                    localStorage.setItem('room_id', room_data.room.id);
                    history.push('/home');
                    socket.emit('updateRoomPlayers', room_data.room.id);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        [login, nickname, roomCode, user, room, join],
    );

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
                    <h1>Faça seu Login</h1>
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
                        Logar
                    </button>
                    <Link className="button" to="/instructions">
                        Como jogar
                    </Link>
                </form>
            </div>
        </div>
    );
}
