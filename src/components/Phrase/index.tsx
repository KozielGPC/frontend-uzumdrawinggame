import React from 'react';

import './styles.css';

export default function Phrase() {
    return (
        <div className="phrase-content">
            <input type="text" placeholder="What do you think this represents?" name="phrase" id="phrase" />
        </div>
    );
}
