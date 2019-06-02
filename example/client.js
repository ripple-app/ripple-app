const io = require('socket.io-client');
const socket = io('ws://localhost:5000', {
    query: {
        token: '1'
    },
    transports: ['websocket']
});

socket.on('message', (message) => {
    console.log(message);
});
