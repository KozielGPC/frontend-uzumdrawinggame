import './styles.css';
import { RoomPlayers } from '../../interfaces/iRoom';

interface Props {
    players: RoomPlayers;
    adm_nick: string;
}

export default function UsersList(props: Props) {
    return (
        <div className="users">
            <h1>Users</h1>
            {/* <h1>Showadm {showAdm ? 'sim' : 'nao'}</h1> */}
            <div className="players">
                <ul>
                    {props.players?.users.map((player) => (
                        <li key={player.user_id}>
                            {props.adm_nick === player.user.username ? (
                                <span className="admin">{player.user.username} </span>
                            ) : (
                                <span className="player">{player.user.username} </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
