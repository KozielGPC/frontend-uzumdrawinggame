import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Draw from '../../components/Draw';
import Answer from '../../components/Answer';
import { v4 as uuidv4 } from 'uuid';

import socket from '../../components/Socket/index';
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
import { Room, RoomPlayers } from '../../interfaces/iRoom';
import { User } from '../../interfaces/iUser';
import { useRoom } from '../../hooks/useRoom';
import { useMatch } from '../../hooks/useMatch';
import { EndMatch, Match, MatchRounds, Round } from '../../interfaces/iMatch';
import { useRound } from '../../hooks/useRound';
import { Content, EnumRoundType, ReceivingRound } from '../../interfaces/iRound';
import api from '../../providers';
import Chat from '../../components/Chat';
import RoomInfo from '../../components/RoomInfo';

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

export default function RoomPage() {
    const { createMatch } = useMatch();
    const { createRound } = useRound();

    const nickname = localStorage.getItem('nickname');
    const user_id = localStorage.getItem('user_id');

    const roomCode = localStorage.getItem('roomCode');
    const room_id = localStorage.getItem('room_id');

    const [room, setRoom] = useState<Room | any>();
    const [user, setUser] = useState<User | any>();

    const [phrases, setPhrases] = useState<Content[]>([
        // { content: 'frase 1', match_id: 'id1' },
        // { content: 'frase2', match_id: 'id2' },
    ]);

    const [draws, setDraws] = useState<Content[]>([
        // { content: a, match_id: 'id1' },
        // { content: a, match_id: 'id2' },
    ]);
    const [results, setResults] = useState<MatchRounds[]>([]);
    const [secondaryResults, setSecondaryResults] = useState<Round[]>([]);

    const [players, setPlayers] = useState<RoomPlayers | null>(null);

    const [phrase, setPhrase] = useState('');

    const [cu, setCu] = useState<string[]>([]);

    const [drawToShow, setDrawToShow] = useState('');
    const [phraseToDraw, setPhraseToDraw] = useState('');

    const [activeInitial, setActiveInitial] = useState(1);
    const [activeDraw, setActiveDraw] = useState(1);
    const [activePhrase, setActivePhrase] = useState(1);
    const [activeResult, setActiveResult] = useState(0);

    let tentativas = 0;
    const [firstStart, setFirstStart] = useState(0);

    const [admin, setAdmin] = useState(false);
    const [showAdm, setShowAdm] = useState(false);
    const [admNick, setAdmNick] = useState('');

    useEffect(() => {
        if (results.length !== 0) {
            setActiveResult(1);
            if (secondaryResults.length !== results[0].rounds.length) {
                const nextround = results[0].rounds[secondaryResults.length];
                console.log('next round: ', nextround);

                setSecondaryResults((secondaryResults: Round[]) => [...secondaryResults, nextround]);
            } else {
                results.splice(0, 1);
                setResults(results);
                setSecondaryResults([]);
                if (results.length === 0) {
                    setActiveResult(0);
                }
            }
        }
    }, [cu]);

    useEffect(() => {
        api.get<Room>(`/room/${room_id}`).then((response) => {
            const sala = response.data;
            console.log('room do response: ', response.data);
            setRoom(sala);

            console.log('room do room: ', room);
        });
    }, []);
    async function getUser() {
        const response = await api.get<User>(`/user/${user_id}`);
        console.log('user do response: ', response.data);

        setUser(response.data);
    }

    // async function getRoom() {
    //     const response = await api.get<Room>(`/room/${room_id}`);
    //     console.log('room do response: ', response.data);

    //     setRoom(response.data);
    // }

    async function getPlayers() {
        const response = await api.get<RoomPlayers>(`/room/${room_id}/players`);
        const room_players = response.data;

        setPlayers(room_players);
    }

    useEffect(() => {
        getUser();
        getPlayers();
    }, []);

    useEffect(() => {
        setAdmNick(room?.room_adm.username);
    }, [room]);

    useEffect(() => {
        if (room && room.room_adm_id == user_id) {
            localStorage.setItem('isAdmin', 'true');
            setAdmin(true);
            console.log('admin foi setado pra true');
        } else {
            localStorage.setItem('isAdmin', 'false');
        }
    }, [user]);

    useEffect(() => {
        socket.on('updatePlayers', async (data) => {
            console.log('updateplayers data: ', data);

            setPlayers(data);
        });

        socket.on('receiveRound', async (data: ReceivingRound) => {
            if (data.receiver_id == user_id) {
                switch (data.type) {
                    case EnumRoundType.PHRASE:
                        setPhrases((phrases) => [
                            ...phrases,
                            { content: data.content, match_id: data.match_id, id: phrases.length },
                        ]);
                        setPhraseToDraw(data.content);
                        setActiveDraw(1);
                        break;

                    case EnumRoundType.DRAW:
                        setDraws((draws) => [
                            ...draws,
                            { content: data.content, match_id: data.match_id, id: phrases.length },
                        ]);
                        setDrawToShow(data.content);
                        setActivePhrase(1);
                        break;
                    default:
                        break;
                }
            }
        });

        socket.on('endMatch', (data: EndMatch) => {
            console.log(room);
            console.log(user);
            console.log(players);
            console.log('tentativas: ', tentativas);
            tentativas += 1;
            const isadmin = localStorage.getItem('isAdmin');
            console.log(`partida ${data.match_id} acabou`);
            console.log('rounds: ', data.rounds);

            setResults((results: MatchRounds[]) => [...results, data.rounds]);
            console.log('results: ', results);

            console.log('admin: ', isadmin);

            console.log('room do endmatch: ', room);

            if (isadmin == 'true') {
                setShowAdm(true);
                console.log('show admin foi setado pra true');
            }

            console.log('showadm: ', showAdm);
        });

        socket.on('showNext', (data: any) => {
            setActiveResult(1);
            console.log('results do shoqwnext', results);
            setCu([...cu, 'macaco']);
        });

        socket.on('restartGame', (data: any) => {
            setActiveInitial(1);
        });
    }, []);

    function handleEmote(idEmote: any) {
        // socket.emit('click-emote', idEmote);
    }

    async function handleCreateGame() {
        try {
            if (phrase.length === 0) {
                alert('frase vazia piá? tá loco né só pode');
            } else {
                return Promise.resolve(
                    createMatch({ room_id: room_id ?? '', match_adm_id: user_id ?? '', match_id: uuidv4() }),
                )
                    .then(async (match: Match) => {
                        await createRound({
                            content: phrase,
                            match_id: match.id,
                            sender_id: user_id ?? '',
                            type: EnumRoundType.PHRASE,
                            receiver_id: match.sort.split(',')[1],
                        });
                        socket.emit('sendNextRound', match.id);
                    })
                    .then(() => {
                        setActiveInitial(0);
                        setPhrase('');
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        } catch (err) {
            alert(err);
        }
    }

    function deleteLastPhrase(id: number) {
        setPhrases(phrases.filter((phrase_filter) => phrase_filter.id != id));
    }

    function deleteLastDraw(id: number) {
        setDraws(draws.filter((draw_filter) => draw_filter.id != id));
    }

    function emitNext() {
        socket.emit('addShowRound', 'macaco');
    }

    function restartGame() {
        socket.emit('restartGame', 'macaco');
        setShowAdm(false);
        setFirstStart(0);
    }

    return (
        <div className="main-container">
            <div className="side">
                <RoomInfo
                    nickname={nickname ?? 'nickname'}
                    roomCode={roomCode ?? 'roomCode'}
                    room_id={room_id ?? ''}
                    user_id={user_id ?? ''}
                />
                <Chat nickname={nickname ?? 'nickname'} />
            </div>
            <div className="content">
                <div className="object" style={activeInitial === 0 ? { display: 'none' } : { display: 'flex' }}>
                    <input
                        type="text"
                        placeholder="Write a random sentence, for example, a red dog skateboarding"
                        name="phrase"
                        id="phrase"
                        onChange={(e) => setPhrase(e.target.value)}
                        value={phrase}
                    />
                    <button type="submit" onClick={() => handleCreateGame()}>
                        Submit
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

                <h1>You have {phrases.length} sentences to draw</h1>
                {phrases.map((phrase) => (
                    <div className="object">
                        <Draw
                            sender_id={user_id}
                            phrase={phrase.content}
                            match_id={phrase.match_id}
                            callbackParent={() => deleteLastPhrase(phrase.id)}
                        />
                    </div>
                ))}

                <h1>You have {draws.length} drawings to describe</h1>
                {draws.map((draw) => (
                    <div className="object">
                        <Answer
                            sender_id={user_id}
                            draw={draw.content}
                            callbackParent={() => deleteLastDraw(draw.id)}
                            match_id={draw.match_id}
                        />
                    </div>
                ))}

                {showAdm ? (
                    <div className="object">
                        <h1>You have {results.length} game to show</h1>
                        {results.length === 0 ? (
                            <button onClick={() => restartGame()}>New game</button>
                        ) : (
                            <button onClick={() => emitNext()}>Show next</button>
                        )}
                    </div>
                ) : null}

                <div className="show-result">
                    {activeResult === 0
                        ? null
                        : secondaryResults.length > 0
                        ? secondaryResults.map((result) =>
                              result.type === 'draw' ? (
                                  <div className="render">
                                      <h2 className="name">{result.sender.username + ': '}</h2>
                                      <ShowDraw draw={result.content} />
                                  </div>
                              ) : (
                                  <div className="render">
                                      <div className="inline">
                                          <h2 className="name">{result.sender.username + ': '}</h2>
                                          <h2 className="phrase-content">{result.content}</h2>
                                      </div>
                                  </div>
                              ),
                          )
                        : null}
                </div>
            </div>

            <div className="side">
                <div className="users">
                    <h1>Users</h1>
                    {/* <h1>Showadm {showAdm ? 'sim' : 'nao'}</h1> */}
                    <div className="players">
                        <ul>
                            {players?.users.map((player) => (
                                <li key={player.user_id}>
                                    {admNick === player.user.username ? (
                                        <span className="admin">{player.user.username} </span>
                                    ) : (
                                        <span className="player">{player.user.username} </span>
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
