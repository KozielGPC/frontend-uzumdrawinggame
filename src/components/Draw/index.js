import React, { useState } from 'react';
import CanvasDraw from "react-canvas-draw";
import { CompactPicker } from 'react-color';
import { FiTrash, FiArrowLeft } from 'react-icons/fi'
import './styles.css';

import socket from '../../components/Socket/index';

import api from '../../services/api';

export default function Draw(props) {

    async function handleSubmit() {
        try {
            if (canvas.getSaveData() !== null) {
                await api.post('game/update', {
                    token: localStorage.getItem('tokenUser'),
                    idGame: props.idGame,
                    draw: canvas.getSaveData()
                });
                socket.emit('send', props.idGame);
                canvas.clear();
            } else {
                alert('deu erro no desenho ai mano envia de novo');
            }
        } catch (error) {
            alert("deu erro mané - Draw");
            console.log('id_game:', props.idGame);
            console.log(error);
        }
    };

    const [selectedColor, setSelectedColor] = useState("#000000");
    const [selectedRadius, setSelectedRadius] = useState(5);
    const [canvas, setCanvas] = useState();

    if (props.fila !== 0) {
        return (
            <div className="draw-content">
                <h2>Desenhe: {props.phrase}</h2>
                <div className="draw">
                    <CanvasDraw
                        loadTimeOffset={8}
                        brushColor={selectedColor}
                        brushRadius={selectedRadius}
                        lazyRadius={0}
                        canvasWidth={538}
                        canvasHeight={538}
                        hideGrid={false}
                        disabled={false}
                        ref={canvasDraw => (setCanvas(canvasDraw))}
                    />
                </div>
                <div className="options">
                    <CompactPicker
                        color={selectedColor}
                        onChangeComplete={(color) => { setSelectedColor(color.hex); console.log(color); }}
                    />
                    <input
                        type="number"
                        value={selectedRadius}
                        onChange={e => setSelectedRadius(parseInt(e.target.value, 10))}
                    />
                </div>
                <div className="buttons">
                    <button onClick={() => { canvas.undo() }}><FiArrowLeft /> Desfazer</button>
                    <button onClick={() => { canvas.clear() }}><FiTrash /> Limpar</button>
                    <button type="submit" onClick={() => {
                        handleSubmit();
                        props.callbackParent();
                    }} >Enviar!
                    </button>
                </div>
            </div>
        );
    } else {
        return <div><p>nada para desenhar</p></div>
    }
}