import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { useUser } from '../../hooks/useUser';
import socket from '../../providers/socket';

import './styles.css';

import { UserContext } from '../../context/UserContext';

export default function UserLogin() {
    const history = useHistory();
    const [nickname, setNickname] = useState('');
    const [roomCode, setRoomCode] = useState('');

    const { setRoom, setUser } = useContext(UserContext);
    const { login } = useUser();
    const { join } = useRoom();

    const handleLoginButton = (e: any) => {
        e.preventDefault();
        login({ username: nickname })
            .then(async (user_data) => {
                const room_data = await join({ room_code: roomCode, user_id: user_data.id });
                return { user_data, room_data };
            })
            .then(({ user_data, room_data }) => {
                setUser(user_data);
                setRoom(room_data.room);
                history.push('/play');
                socket.emit('updateRoomPlayers', room_data.room.id);
                socket.emit('sendMessage', { text: 'Entrou na sala', author: nickname });
            })
            .catch((err) => {
                console.error(err);
                alert('This user is already logged in!');
            });
    };

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
