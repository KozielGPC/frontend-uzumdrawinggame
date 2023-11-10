import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { CompactPicker } from 'react-color';
import { FiTrash, FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import socket from '../../providers/socket';
import { EnumRoundType } from '../../interfaces/iRound';

interface Props {
    phrase: string;
    match_id: string;
    callbackParent: any;
    sender_id: string | null;
}

export default function Draw(props: Props) {
    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            if (canvas.getSaveData() !== null) {
                const data = {
                    match_id: props.match_id,
                    content: canvas.getSaveData(),
                    sender_id: props.sender_id,
                    type: EnumRoundType.DRAW,
                };

                socket.emit('sendRound', data);
            } else {
                alert('deu erro no desenho ai mano envia de novo');
            }
        } catch (error) {
            alert('deu erro mané - Draw');
        }
    }

    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedRadius, setSelectedRadius] = useState(5);
    const [canvas, setCanvas] = useState<any>();
    return (
        <div className="draw-content">
            <h2>Draw: {props.phrase}</h2>
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
                    ref={(canvasDraw) => setCanvas(canvasDraw)}
                />
            </div>
            <div className="options">
                <CompactPicker
                    color={selectedColor}
                    onChangeComplete={(color) => {
                        setSelectedColor(color.hex);
                    }}
                />
                <input
                    type="number"
                    value={selectedRadius}
                    onChange={(e) => setSelectedRadius(parseInt(e.target.value, 10))}
                />
            </div>
            <div className="buttons">
                <button
                    onClick={() => {
                        canvas.undo();
                    }}
                >
                    <FiArrowLeft /> Undo
                </button>
                <button
                    onClick={() => {
                        canvas.clear();
                    }}
                >
                    <FiTrash /> Clear
                </button>
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
        </div>
    );
}
