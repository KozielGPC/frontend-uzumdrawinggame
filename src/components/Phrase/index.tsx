import React from 'react';

import './styles.css';

export default function Phrase(){
    return(
        <div className="phrase-content">
            <input 
                type="text" 
                placeholder='Digite o que você está pensando' 
                name="phrase" 
                id="phrase"
            />
        </div>
    );
}