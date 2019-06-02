const agent = require('./agent')({
    host: 'localhost',
    port: '5000',
    detail: {
        query: {
            token: ['1']
        },
        transports: ['websocket']
    }
});

setInterval(() => {
    agent.emit('data', {
        timeslice: Date.now(),
        value: Math.floor((Math.random() * 100)) + 1
    });
}, 500);

