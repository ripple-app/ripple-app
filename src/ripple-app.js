const ripple = require('./ripple');
const errorHandler = require('./component/error/error-handler');
import logger from './component/log/log';
import { EventEmitter } from 'events';
const _event = new EventEmitter();
const _instance = new Map();

function updateInstance(instance) {
    _event.emit('instance:update', instance);
}

function hasToken(token) {
    return !(!(_instance.get(token)));
}

module.exports = (function (server) {
    let _data = '';
    const io = require('socket.io')(server, { transports: ['websocket'] });

    io.on('connection', (socket) => {
        logger.info('connect');
        const tokens = socket.handshake.query.token
            .split(',')
            .map((t) => (`${t}`))
            .filter(hasToken) || [];

        ripple.join(socket, tokens, (err) => {
            if (err) {
                errorHandler.emit('error', err);
            }
        });

        socket.on('data', (data) => {
            _data = ripple.sendMessage(socket, tokens, `${_data}${data}`);
        });

        socket.on('disconnect', () => {
            logger.info('disconnect');
            ripple.leave(socket, tokens);
        });
    });

    _event.on('instance:update', (instance) => {
        logger.info(instance);
        for (const ins of instance) {
            _instance.set(ins.id, ins);
        }
    });

    return {
        updateInstance
    };
});

module.exports.__private__ = {
    _instance,
    ripple
};
