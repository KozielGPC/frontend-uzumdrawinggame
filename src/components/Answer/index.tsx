import { useState } from 'react';
import ShowDraw from '../../components/ShowDraw';

import socket from '../../providers/socket';
import { EnumRoundType } from '../../interfaces/iRound';

import './styles.css';

interface Props {
    draw: string;
    match_id: string;
    callbackParent: any;
    sender_id: string | null;
}

export default function Answer(props: Props) {
    const [phrase, setPhrase] = useState('');

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            if (phrase !== null) {
                const data = {
                    match_id: props.match_id,
                    content: phrase,
                    sender_id: props.sender_id,
                    type: EnumRoundType.PHRASE,
                };

                socket.emit('sendRound', data);
            } else {
                alert('ia dar erro ai mane, tenta de novo');
            }
        } catch (error) {
            alert('deu erro mané - Answer');
            console.log(error);
        }
    }

    return (
        <div className="answer-content">
            <ShowDraw draw={props.draw} />
            <input
                type="text"
                placeholder="What do you think this represents?"
                name="answer"
                id="answer"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
            />
            <button
                type="submit"
                onClick={(e) => {
                    handleSubmit(e);
                    props.callbackParent();
                }}
            >
                Send!
            </button>
        </div>
    );
}
