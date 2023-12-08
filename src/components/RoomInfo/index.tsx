import { useCallback } from 'react';
import './styles.css';
import { useRoom } from '../../hooks/useRoom';
import { useUser } from '../../hooks/useUser';
import socket from '../../providers/socket';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row, Typography } from 'antd';

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
                socket.emit('sendMessage', { text: 'Saiu da sala', author: props.nickname });
                history.push('/');
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <Row>
            <Col>
                <Typography.Title>Nick: {props.nickname}</Typography.Title>
                <Typography.Title>Room: {props.roomCode}</Typography.Title>
            </Col>
            <Col>
                <Button
                    type="primary"
                    // loading={loading}
                    onClick={() => handleLogOffButton()}
                >
                    Logout!
                </Button>
            </Col>
        </Row>
    );
}
