import React, { useState } from 'react';
import ShowDraw from '../../components/ShowDraw';

import socket from '../../components/Socket/index';
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

    async function handleSubmit() {
        try {
            if (phrase !== null) {
                const data = {
                    match_id: props.match_id,
                    content: phrase,
                    sender_id: props.sender_id,
                    type: EnumRoundType.PHRASE,
                };
                console.log('data answer: ', data);

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
                placeholder="Digite o que você está pensando"
                name="answer"
                id="answer"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
            />
            <button
                type="submit"
                onClick={() => {
                    handleSubmit();
                    props.callbackParent();
                }}
            >
                Enviar!
            </button>
        </div>
    );
}
