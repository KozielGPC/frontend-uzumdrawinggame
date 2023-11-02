import { useEffect, useState } from 'react';
import socket from '../../components/Socket/index';

interface Message {
    text: string;
    author: string;
}

interface Props {
    nickname: string;
}

function updateScroll() {
    var element: any = document.getElementById('chat');
    element.scrollTop = element.scrollHeight;
}

export default function Chat(props: Props) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        updateScroll();
    }, [messages]);

    useEffect(() => {
        socket.on('messageReceived', async (data: Message) => {
            setMessages((messages: Message[]) => [...messages, data]);
        });
    }, []);

    async function sendMessage(e: any) {
        e.preventDefault();
        if (message.length > 0 && message.length <= 50) {
            socket.emit('sendMessage', { text: message, author: props.nickname });
            setMessage('');
        }
    }

    return (
        <div className="chat">
            {/* <h1>
        É ADM? : {admin ? 'sim' : 'nao'} b: {b ? 'sim' : 'nao'}
    </h1> */}
            <h2>Game chat</h2>

            <div className="messages" id="chat">
                {messages.map((m) => (
                    <a className="m">
                        <strong>{m.author + ': '}</strong>
                        {m.text}
                    </a>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    maxLength={50}
                    type="text"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></input>
                <button type="submit" onClick={(e) => sendMessage(e)}>
                    Send message
                </button>
            </form>
        </div>
    );
}
