import { useCallback } from 'react';
import './styles.css';
import { useRoom } from '../../hooks/useRoom';
import { useUser } from '../../hooks/useUser';
import socket from '../../providers/socket';
import { useHistory } from 'react-router-dom';

interface Props {
    nickname: string;
    roomCode: string;
    user_id: string;
    room_id: string;
}

export default function RoomInfo(props: Props) {
    const { exit } = useRoom();
    const { logoff } = useUser();
    const history = useHistory();

    const handleLogOffButton = useCallback(async () => {
        return Promise.resolve(exit({ room_id: props.room_id ?? '', player_id: props.user_id ?? '' }))
            .then(() => logoff({ user_id: props.user_id ?? '' }))
            .then(() => {
                localStorage.clear();
                socket.emit('updateRoomPlayers', props.room_id);
                history.push('/');
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <div className="user-data">
                <h2>Nick: {props.nickname}</h2>
                <h2>Room: {props.roomCode}</h2>
            </div>
            <div className="red-button">
                <button type="submit" onClick={() => handleLogOffButton()}>
                    Logout!
                </button>
            </div>
        </>
    );
}
