import { EventEmitter } from 'events';
const _event = new EventEmitter();
const logger = require('../log/log');

_event.on('error', (err) => {
    logger.error(err);
})

module.exports = _event;
