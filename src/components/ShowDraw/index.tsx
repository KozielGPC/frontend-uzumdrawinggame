import React from 'react';
import CanvasDraw from "react-canvas-draw";
import './styles.css';

interface Props{
    draw: string;
}
export default function ShowDraw(props: Props) {

    return (
        <div className="draw-content">
            <div className="draw">
                <CanvasDraw
                    canvasWidth={538}
                    canvasHeight={538}
                    disabled={true}
                    hideGrid={true}
                    brushRadius={0.01}
                    lazyRadius={0}
                    saveData ={props.draw}
                    immediateLoading={true} 
                    brushColor={'#FFFFFF'}
                    hideInterface={true}
                />
            </div>
        </div>
    );
};