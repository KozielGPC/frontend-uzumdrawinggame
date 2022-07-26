import React from 'react';

import {Link} from 'react-router-dom'

import './styles.css';

export default function Instructions(){
    return(
        <div className="container">
            <div className="content">
                <div className="title">
                    <h1>Como Jogar</h1>
                </div>
                
                <div className="text">
                <ol>
                    <li>
                        Escolha um nick, entre em uma sala e inicie a partida
                    </li>
                    <li>
                        Na primeira rodada, todos os jogadores escrevem frases aleatórias e enviam uns para os outros
                    </li>
                    <li>
                         Após isso cada um recebe uma frase e desenha o que está escrito
                    </li>
                    <li>
                        Depois de enviar o desenho o jogador pode receber uma frase ou um desenho. 
                        Se receber um desenho, escreve o que acha que pode ser.
                        Se receber uma frase, desenha o que está escrito
                    </li>
                    <li>
                        Assim se segue até a última rodada, onde os jogadores podem mostrar 
                        toda a sequência feita e ver o que mudou em cada uma
                    </li>
                </ol>
                </div>
                <Link to ="/" className="button">Voltar</Link>
            </div>
        </div>
    );
}