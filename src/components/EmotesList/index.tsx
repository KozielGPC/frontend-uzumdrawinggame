import './styles.css';
import cavaloIcon from '../../assets/emotes/cavalo2.png';
import ruimIcon from '../../assets/emotes/ruim2.png';
import surpriseIcon from '../../assets/emotes/surprise.png';
import tanIcon from '../../assets/emotes/tan2.png';
import eoqIcon from '../../assets/emotes/eoq.png';
import faustaoIcon from '../../assets/emotes/faustao.png';
import chavesIcon from '../../assets/emotes/chaves.png';
import macacoIcon from '../../assets/emotes/macaco.png';
import facepalmIcon from '../../assets/emotes/facepalm2.png';
import peidoIcon from '../../assets/emotes/peido.png';
import rojaoIcon from '../../assets/emotes/rojao.png';

// const eoq = require('../../assets/sounds/eoq.mp3');
// const burro = require ('../../assets/sounds/burro.mp3');
// const cavalo = require ('../../assets/sounds/cavalo.mp3');
// const errou = require ('../../assets/sounds/errou.mp3');
// const facepalm = require ('../../assets/sounds/facepalm.mp3');
// const macaco = require ('../../assets/sounds/olha-o-macaco.mp3');
// const peido = require ('../../assets/sounds/peido.mp3');
// const rojao = require ('../../assets/sounds/rojao.mp3');
// const shock = require ('../../assets/sounds/shock.mp3');
// const tan = require ('../../assets/sounds/tan.mp3');
// const surprise = require ('../../assets/sounds/surprise.mp3');
// const ruim = require ('../../assets/sounds/ruim.mp3');

// const soundsList = [
//     { sound: eoq, idSound: 1 },
//     { sound: burro, idSound: 2 },
//     { sound: cavalo, idSound: 3 },
//     { sound: errou, idSound: 4 },
//     { sound: facepalm, idSound: 5 },
//     { sound: macaco, idSound: 6 },
//     { sound: peido, idSound: 7 },
//     { sound: rojao, idSound: 8 },
//     { sound: shock, idSound: 9 },
//     { sound: tan, idSound: 10 },
//     { sound: surprise, idSound: 11 },
//     { sound: ruim, idSound: 12 },
// ]

function handleEmote(idEmote: any) {
    // socket.emit('click-emote', idEmote);
}

export default function EmotesList() {
    return (
        <div className="emotes">
            <div className="emotes-title">
                <h1>Emotes</h1>
            </div>
            <div className="emotes-button">
                <button className="emote-button" onClick={() => handleEmote(1)}>
                    <img src={eoqIcon} alt="eoq" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(2)}>
                    <img src={chavesIcon} alt="chaves-aiqburro" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(3)}>
                    <img src={cavaloIcon} alt="cavalo" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(4)}>
                    <img src={faustaoIcon} alt="faustao-errou" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(5)}>
                    <img src={facepalmIcon} alt="facepalm" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(6)}>
                    <img src={macacoIcon} alt="macaco" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(7)}>
                    <img src={peidoIcon} alt="peido" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(8)}>
                    <img src={rojaoIcon} alt="rojao" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(9)}>
                    <img src={tanIcon} alt="tan-tan-taaan" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(10)}>
                    <img src={tanIcon} alt="tan-tan-taaan" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(11)}>
                    <img src={surpriseIcon} alt="surprise-motherf*cker" />
                </button>
                <button className="emote-button" onClick={() => handleEmote(12)}>
                    <img src={ruimIcon} alt="ruim-piorou" />
                </button>
            </div>
        </div>
    );
}
