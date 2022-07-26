import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
// import axios from 'axios';

import './styles.css';
// import api from '../../services/api';


// import socket from '../../components/Socket/index';

export default function UserLogin() {

    // const [nickname, setNickname] = useState("");
    // const [roomCode, setRoomCode] = useState("");

    // const history = useHistory();

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
                <form>
                    <h1>Faça seu Login</h1>
                    <input placeholder="Nickname"  required  />
                    <input placeholder="Room Code" required  />
                    <button className="button-green" type="submit">Logar</button>
                    <Link className="button" to="/instructions">Como jogar</Link>
                </form>

            </div>

        </div>

    );

}