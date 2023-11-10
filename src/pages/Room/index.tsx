import React, { useContext, useEffect, useState } from 'react';
import Draw from '../../components/Draw';
import Answer from '../../components/Answer';
import { v4 as uuidv4 } from 'uuid';

import socket from '../../providers/socket';
import './styles.css';

import ShowDraw from '../../components/ShowDraw';
import { Room, RoomPlayers } from '../../interfaces/iRoom';
import { User } from '../../interfaces/iUser';
import { useMatch } from '../../hooks/useMatch';
import { EndMatch, Match, MatchRounds, Round } from '../../interfaces/iMatch';
import { useRound } from '../../hooks/useRound';
import { Content, EnumRoundType, ReceivingRound } from '../../interfaces/iRound';
import api from '../../providers/api';
import Chat from '../../components/Chat';
import RoomInfo from '../../components/RoomInfo';
import UsersList from '../../components/UsersList';
import EmotesList from '../../components/EmotesList';
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function RoomPage() {
    const { createMatch } = useMatch();
    const { createRound } = useRound();

    const { user, room }: { user: User | null; room: Room | null } = useContext(UserContext);

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

    const [activeInitial, setActiveInitial] = useState(1);
    const [activeResult, setActiveResult] = useState(0);

    const [firstStart, setFirstStart] = useState(0);

    const [showAdm, setShowAdm] = useState(false);
    const [admNick, setAdmNick] = useState('');

    const { logoff } = useUser();

    const history = useHistory();

    // logic to show game sequence
    useEffect(() => {
        if (results.length !== 0) {
            setActiveResult(1);
            if (secondaryResults.length !== results[0].rounds.length) {
                const nextround = results[0].rounds[secondaryResults.length];
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

    async function getPlayers() {
        const response = await api.get<RoomPlayers>(`/room/${room?.id}/players`);
        const room_players = response.data;

        setPlayers(room_players);
    }

    useEffect(() => {
        setAdmNick(room?.room_adm?.username ?? '');

        getPlayers();

        socket.on('updatePlayers', async (data) => {
            setPlayers(data);
        });
    }, [room]);

    useEffect(() => {
        let isAdm = false;
        if (room && room.room_adm_id === user?.id) {
            isAdm = true;
        } else {
            isAdm = false;
        }
        socket.on('receiveRound', async (data: ReceivingRound) => {
            if (data.receiver_id === user?.id) {
                switch (data.type) {
                    case EnumRoundType.PHRASE:
                        setPhrases((phrases) => [
                            ...phrases,
                            { content: data.content, match_id: data.match_id, id: phrases.length },
                        ]);
                        break;

                    case EnumRoundType.DRAW:
                        setDraws((draws) => [
                            ...draws,
                            { content: data.content, match_id: data.match_id, id: phrases.length },
                        ]);
                        break;
                    default:
                        break;
                }
            }
        });

        socket.on('endMatch', (data: EndMatch) => {
            setResults((results: MatchRounds[]) => [...results, data.rounds]);

            if (isAdm === true) {
                setShowAdm(true);
            }
        });

        socket.on('showNext', (data: any) => {
            setActiveResult(1);
            setCu([...cu, 'macaco']);
        });

        socket.on('restartGame', (data: any) => {
            setActiveInitial(1);
        });

        const handleBeforeUnload = (event: any) => {
            logoff({ user_id: user?.id ?? '' });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    async function handleCreateGame() {
        try {
            if (phrase.length === 0) {
                alert('frase vazia piá? tá loco né só pode');
            } else {
                return Promise.resolve(
                    createMatch({ room_id: room?.id ?? '', match_adm_id: user?.id ?? '', match_id: uuidv4() }),
                )
                    .then(async (match: Match) => {
                        await createRound({
                            content: phrase,
                            match_id: match.id,
                            sender_id: user?.id ?? '',
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
        setPhrases(phrases.filter((phrase_filter) => phrase_filter.id !== id));
    }

    function deleteLastDraw(id: number) {
        setDraws(draws.filter((draw_filter) => draw_filter.id !== id));
    }

    function emitNext() {
        socket.emit('addShowRound', 'macaco');
    }

    function restartGame() {
        socket.emit('restartGame', 'macaco');
        setShowAdm(false);
        setFirstStart(0);
    }

    if (room === null || user === null) {
        history.push('/');
    }
    return (
        <div className="main-container">
            <div className="side">
                <RoomInfo
                    nickname={user?.username ?? 'nickname'}
                    roomCode={room?.room_code ?? 'roomCode'}
                    room_id={room?.id ?? ''}
                    user_id={user?.id ?? ''}
                />
                <Chat nickname={user?.username ?? 'nickname'} />
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
                            sender_id={user?.id ?? ''}
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
                            sender_id={user?.id ?? ''}
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
                <UsersList adm_nick={admNick ?? ''} players={players ?? { users: [], room_adm: user }} />
                <EmotesList />
            </div>
        </div>
    );
}
