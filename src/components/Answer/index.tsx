import React, { useState } from 'react';
import ShowDraw from '../../components/ShowDraw';

import socket from '../../components/Socket/index';

import './styles.css';

export default function Answer(props: any) {
    const [phrase, setPhrase] = useState('');

    async function handleSubmit() {
        try {
            if (phrase !== null) {
                // await api.post('game/update', {
                //     token: localStorage.getItem('tokenUser'),
                //     idGame: props.idGame,
                //     phrase: phrase,
                // });
                // socket.emit('send', props.idGame);
                // setPhrase('');
            } else {
                alert('ia dar erro ai mane, tenta de novo');
            }
        } catch (error) {
            alert('deu erro mané - Answer');
            console.log('id_game:', props.idGame);
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
