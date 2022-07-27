import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Draw from '../../components/Draw';
import Answer from '../../components/Answer';

// import socket from '../../components/Socket/index';

// import api from '../../services/api';

import './styles.css';

import cavaloIcon from '../../assets/emotes/cavalo2.png';
import ruimIcon from '../../assets/emotes/ruim2.png';
import surpriseIcon from '../../assets/emotes/surprise.png';
import tanIcon from '../../assets/emotes/tan2.png';
import eoqIcon from '../../assets/emotes/eoq.png';
import faustaoIcon from '../../assets/emotes/faustao.png';
import chavesIcon from '../../assets/emotes/chaves.png';
import macacoIcon from '../../assets/emotes/macaco.png';
import facepalmIcon from '../../assets/emotes/facepalm2.png';
import peidoIcon from '../../assets/emotes/peido.png';
import rojaoIcon from '../../assets/emotes/rojao.png';

// const eoq = require('../../assets/sounds/eoq.mp3');
// const burro = require ('../../assets/sounds/burro.mp3');
// const cavalo = require ('../../assets/sounds/cavalo.mp3');
// const errou = require ('../../assets/sounds/errou.mp3');
// const facepalm = require ('../../assets/sounds/facepalm.mp3');
// const macaco = require ('../../assets/sounds/olha-o-macaco.mp3');
// const peido = require ('../../assets/sounds/peido.mp3');
// const rojao = require ('../../assets/sounds/rojao.mp3');
// const shock = require ('../../assets/sounds/shock.mp3');
// const tan = require ('../../assets/sounds/tan.mp3');
// const surprise = require ('../../assets/sounds/surprise.mp3');
// const ruim = require ('../../assets/sounds/ruim.mp3');

import ShowDraw from '../../components/ShowDraw';
import { useUser } from '../../hooks/useUser';
import { Room } from '../../interfaces/iRoom';
import { User } from '../../interfaces/iUser';
import { useRoom } from '../../hooks/useRoom';

// const soundsList = [
//     { sound: eoq, idSound: 1 },
//     { sound: burro, idSound: 2 },
//     { sound: cavalo, idSound: 3 },
//     { sound: errou, idSound: 4 },
//     { sound: facepalm, idSound: 5 },
//     { sound: macaco, idSound: 6 },
//     { sound: peido, idSound: 7 },
//     { sound: rojao, idSound: 8 },
//     { sound: shock, idSound: 9 },
//     { sound: tan, idSound: 10 },
//     { sound: surprise, idSound: 11 },
//     { sound: ruim, idSound: 12 },
// ]

export default function RegisterUser() {
    const { getall, login, logoff } = useUser();
    const { exit } = useRoom();

    const nickname = localStorage.getItem('nickname');
    const user_id = localStorage.getItem('user_id');
    // const token = localStorage.getItem('tokenUser');
    const roomCode = localStorage.getItem('roomCode');
    const room_id = localStorage.getItem('room_id');

    const [room, setRoom] = useState<Room>();
    const [user, setUser] = useState<User>();

    const [phrases, setPhrases] = useState([]);
    const [draws, setDraws] = useState([]);
    const [results, setResults] = useState([]);
    const [secondaryResults, setSecondaryResults] = useState([]);

    const [players, setPlayers] = useState([]);
    const [newPlayers, setNewPlayers] = useState();

    const [phrase, setPhrase] = useState('');

    const [cu, setCu] = useState([]);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [drawToShow, setDrawToShow] = useState('');
    const [phraseToDraw, setPhraseToDraw] = useState('');

    const [activeInitial, setActiveInitial] = useState(0);
    const [activeDraw, setActiveDraw] = useState(0);
    const [activePhrase, setActivePhrase] = useState(0);
    const [activeResult, setActiveResult] = useState(0);

    const [firstStart, setFirstStart] = useState(0);

    const [admin, setAdmin] = useState(false);
    const [showAdm, setShowAdm] = useState(0);
    const [admNick, setAdmNick] = useState();

    const history = useHistory();

    const handleLogOffButton = useCallback(async () => {
        return Promise.resolve(exit({ room_id: room_id ?? '', player_id: user_id ?? '' }))
            .then(() => logoff({ user_id: user_id ?? '' }))
            .then(() => {
                localStorage.clear();
                history.push('/');
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // useEffect(() => {
    //     if (!nickname || !token) {
    //         history.push('/');
    //     }
    //     api.get('user?roomCode='+roomCode)
    //         .then(response => {
    //             setPlayers(response.data)
    //         });
    // }, [newPlayers]);

    // useEffect(() => {

    //     socket.on('login', async data => {
    //         const response = await api.post('checkToken', { token: token, id: data.admId });
    //         if (response.data.valid === true) {
    //             setAdmin(true);
    //             setFirstStart(1);
    //         };
    //         setNewPlayers(data.nickname);
    //         setAdmNick(data.admNick);
    //     });

    //     socket.on('logoff', async data => {
    //         setNewPlayers(data);
    //     });

    //     socket.on('newAdmin', async data => {
    //         const response = await api.post('checkToken', { token: token, id: data.idAdm });
    //         if (response.data.valid === true) {
    //             setAdmin(true);
    //             socket.emit('sendMessage', { message: " é o novo Admin", author: nickname });
    //         };
    //         setAdmNick(data.admNick);
    //     });

    //     socket.on('emote-sound', idEmote => {
    //         let emote = null;
    //         for (const sound of soundsList) {
    //             if (sound.idSound === idEmote) emote = sound.sound;
    //         };
    //         const audio = new Audio(emote);
    //         audio.volume = 0.225;
    //         audio.play();
    //     });

    //     socket.on('render', async data => {
    //         const response = await api.post('checkToken', { token: token, id: data.id_receiver });
    //         if (response.data.valid === true) {
    //             if (data.type === 'phrase') {
    //                 setPhrases(phrases => [...phrases, { content: data.content, idGame: data.id_game }]);
    //             } else {
    //                 setDraws(draws => [...draws, { content: data.content, idGame: data.id_game }]);
    //             };
    //         };
    //         if (data.last === true) {
    //             const response = await api.post('checkToken', { token: token, id: data.admId });
    //             if (response.data.valid === true) {
    //                 setAdmin(true);
    //                 setShowAdm(1);
    //             };
    //             const result = await api.post('getResult', { idGame: data.id_game });
    //             setResults(results => [...results, result.data]);
    //         };
    //     });

    //     socket.on('messageReceived', async data => {
    //         setMessages(messages => [...messages, data]);
    //     });

    //     socket.on('showNext', data => {
    //         setCu(cu => [...cu, data]);
    //     });

    //     socket.on('restart-game', data => {
    //         setActiveInitial(1);
    //     });
    // }, []);

    // useEffect(() => {
    //     if (phrases.length !== 0) {
    //         setPhraseToDraw(phrases[0].content);
    //         setActiveDraw(1);
    //     }
    //     else {
    //         setActiveDraw(0);
    //     }
    // }, [phrases]);

    // useEffect(() => {
    //     if (draws.length !== 0) {
    //         setDrawToShow(draws[0].content);
    //         setActivePhrase(1);
    //     }
    //     else {
    //         setActivePhrase(0);
    //     }
    // }, [draws]);

    // useEffect(() => {
    //     if (results.length !== 0) {
    //         setActiveResult(1);
    //         if (secondaryResults.length !== results[0].length) {
    //             setSecondaryResults(secondaryResults => [results[0][secondaryResults.length], ...secondaryResults]);
    //         } else {
    //             results.splice(0, 1);
    //             setResults(results);
    //             setSecondaryResults([]);
    //             if (results.length === 0) {
    //                 setActiveResult(0);
    //             };
    //         };
    //     };
    // }, [cu]);

    function handleEmote(idEmote: any) {
        // socket.emit('click-emote', idEmote);
    }

    async function handleCreateGame() {
        try {
            // if (phrase.length === 0) {
            //     alert("frase vazia piá? tá loco né só pode");
            // } else {
            //     const response = await api.post('game/create', { token: token, phrase: phrase, roomCode: roomCode });
            //     setActiveInitial(0);
            //     socket.emit('send', response.data.id_game);
            //     setPhrase('');
            // }
        } catch (err) {
            alert(err);
        }
    }

    function deleteLastPhrase() {
        // phrases.splice(0, 1);
        // setPhrases(phrases);
        // if (phrases.length === 0) {
        //     setActiveDraw(0);
        // }
        // else {
        //     setPhraseToDraw(phrases[0].content);
        // }
    }

    function deleteLastDraw() {
        // draws.splice(0, 1);
        // setDraws(draws);
        // if (draws.length === 0) {
        //     setActivePhrase(0);
        // }
        // else {
        //     setDrawToShow(draws[0].content);
        // }
    }

    async function handleLogoff() {
        try {
            // socket.emit('sendMessage', { message: 'Saiu da sala', author: nickname });
            // await api.put('user', { token: localStorage.getItem('tokenUser'), active: false, roomCode: roomCode });
            // socket.emit('logoff', { isAdm: admin })
            localStorage.clear();
            history.push('/');
            window.location.reload();
        } catch (err) {
            alert(err);
        }
    }

    // async function sendMessage() {
    //     if (message.length > 0 && message.length <= 50) {
    //         socket.emit('sendMessage', { message: message, author: nickname });
    //         setMessage("");
    //     };
    // };

    function emitNext() {
        // socket.emit('emitNext', 'macaco');
    }

    function restartGame() {
        // socket.emit('restart-game', 'macaco');
        setShowAdm(0);
        setFirstStart(0);
    }

    return (
        <div className="main-container">
            <div className="side">
                <div className="user-data">
                    <h2>Nick: {nickname}</h2>
                    <h2>Room: {roomCode}</h2>
                </div>
                <div className="red-button">
                    <button type="submit" onClick={() => handleLogOffButton()}>
                        Deslogar!
                    </button>
                </div>
                {/* <div className="chat">
                    <h2>Chat dos brabo</h2>
                    <div className="messages">
                        {messages.map(m => (
                            <a className="m"><strong>{m.author + ": "}</strong>{m.message}</a>
                        ))
                        }
                    </div>
                    <input maxlength="50" type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} ></input>
                    <button type='submit' onClick={() => sendMessage()} >Enviar mensagem</button>
                </div> */}
            </div>
            <div className="content">
                <div className="object" style={activeInitial === 0 ? { display: 'none' } : { display: 'flex' }}>
                    <input
                        type="text"
                        placeholder="Digite alguma coisa"
                        name="phrase"
                        id="phrase"
                        onChange={(e) => setPhrase(e.target.value)}
                        value={phrase}
                    />
                    <button type="submit" onClick={() => handleCreateGame()}>
                        Enviar!
                    </button>
                </div>

                {firstStart === 0 ? null : (
                    <div className="object">
                        {results.length === 0 ? (
                            <button onClick={() => restartGame()}>Novo jogo</button>
                        ) : (
                            <button onClick={() => emitNext()}>Mostrar próximo</button>
                        )}
                    </div>
                )}

                <div className="object">
                    <h1>Voce tem {phrases.length} frases para desenhar</h1>
                    {activeDraw === 0 ? null : (
                        <Draw fila={phrases.length} phrase={phraseToDraw} callbackParent={() => deleteLastPhrase()} />
                    )}
                </div>

                {/* <div className="object">
                    <h1>Voce tem {draws.length} desenhos para descrever</h1>
                    {activePhrase === 0 ? null : <Answer fila={draws.length} draw={drawToShow} callbackParent={() => deleteLastDraw()} idGame={draws[0].idGame} />}
                </div> */}

                {/* {showAdm === 0 ? null :
                    <div className="object">
                        <h1>Voce tem {results.length} jogos para apresentar</h1>
                        {results.length === 0 ? <button onClick={() => restartGame()}>Novo jogo</button> : <button onClick={() => emitNext()}>Mostrar próximo</button>}
                    </div>
                } */}

                {/* <div className="show-result">
                    {activeResult === 0 ? null :
                        secondaryResults.length > 0 ? secondaryResults.map(result => (
                            result.type === 'draw' ?
                                <div className="render">
                                    <h2 className="name">{result.name + ': '}</h2>
                                    <ShowDraw draw={result.content} />
                                </div>
                                :
                                <div className="render">
                                    <div className="inline">
                                        <h2 className="name">{result.name + ': '}</h2><h2 className="phrase-content">{result.content}</h2>
                                    </div>
                                </div>
                        )) : null
                    }
                </div> */}
            </div>

            <div className="side">
                <div className="users">
                    <h1>Users</h1>
                    <div className="players">
                        <ul>
                            {players.map((player) => (
                                <li>
                                    {admNick === 'player.name' ? (
                                        <span className="admin">{'player.name'} </span>
                                    ) : (
                                        <span className="player">{'player.name'} </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="emotes">
                    <div className="emotes-title">
                        <h1>Emotes</h1>
                    </div>
                    <div className="emotes-button">
                        <button className="emote-button" onClick={() => handleEmote(1)}>
                            <img src={eoqIcon} alt="eoq" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(2)}>
                            <img src={chavesIcon} alt="chaves-aiqburro" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(3)}>
                            <img src={cavaloIcon} alt="cavalo" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(4)}>
                            <img src={faustaoIcon} alt="faustao-errou" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(5)}>
                            <img src={facepalmIcon} alt="facepalm" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(6)}>
                            <img src={macacoIcon} alt="macaco" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(7)}>
                            <img src={peidoIcon} alt="peido" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(8)}>
                            <img src={rojaoIcon} alt="rojao" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(9)}>
                            <img src={tanIcon} alt="tan-tan-taaan" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(10)}>
                            <img src={tanIcon} alt="tan-tan-taaan" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(11)}>
                            <img src={surpriseIcon} alt="surprise-motherf*cker" />
                        </button>
                        <button className="emote-button" onClick={() => handleEmote(12)}>
                            <img src={ruimIcon} alt="ruim-piorou" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
