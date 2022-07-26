import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3331');

export default socket;