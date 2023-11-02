import { Link } from 'react-router-dom';

import './styles.css';

export default function Instructions() {
    return (
        <div className="container">
            <div className="content">
                <div className="title">
                    <h1>How to Play</h1>
                </div>

                <div className="text">
                    <ol>
                        <li>Choose a nickname, join a room and start a game</li>
                        <li>In the first round, all the players write random sentences and send them to each other</li>
                        <li>After that, each one receives a sentence and draws what is written</li>
                        <li>
                            After sending the drawing, the player can receive either a sentence or a drawing. If they
                            receive a drawing, they write what they think it could be. If they receive a sentence, they
                            draw what is written
                        </li>
                        <li>
                            This continues until the final round, where the players can display the entire sequence
                            created and see what has changed in each one
                        </li>
                    </ol>
                </div>
                <Link to="/" className="button">
                    Home
                </Link>
            </div>
        </div>
    );
}
