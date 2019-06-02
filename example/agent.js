const io = require('socket.io-client')
const EventEmitter = require('events');
const log4js = require('log4js');

log4js.configure({
    appenders: {
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'INFO' }
    }
});

const logger = log4js.getLogger();

module.exports = function (options) {
    const _event = new EventEmitter();
    const { host, port, detail } = options;

    // detail = {
    //     query: {
    //         token: '1'
    //     },
    //     transports: ['websocket']
    // }

    const socket = io(`ws://${host}:${port}`, detail);
    _event.on('data', (data) => {
        logger.debug(data);
        socket.emit('data', `${JSON.stringify(data)}!`);
    });

    _event.on('shutdown', () => {

    });

    return _event;
};
