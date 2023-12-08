import { useEffect, useState } from 'react';
import { Input, Button, Card } from 'antd';
import socket from '../../providers/socket';

const { TextArea } = Input;

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
        <Card title="Game chat">
            <div id="chat">
                {messages.map((m, index) => (
                    <p key={index}>
                        <strong>{m.author + ': '}</strong>
                        {m.text}
                    </p>
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
                <Button type="primary" onClick={(e) => sendMessage(e)}>
                    Send message
                </Button>
            </form>
        </Card>
    );
}
