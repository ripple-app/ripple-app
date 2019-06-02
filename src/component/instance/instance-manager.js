import { EventEmitter } from 'events';
const logger = require('../log/log');
const errorHandler = require('../error/error-handler');

const _instance = new Map();
const _event = new EventEmitter();
let _repository;

async function getList() {
    const result = await _repository.find().catch((err) => {
        errorHandler.emit('error', err);
        return [];
    });
    logger.debug(result);
    return result;
}

async function add(param) {
    logger.debug(JSON.stringify(param));
    const instance = _repository.create(param);
    await _repository.add(instance);
}

async function remove(id) {
    logger.debug(`delete id: ${id}`);
    await _repository.remove(id);
}

async function instanceUpdate() {
    const result = await getList();

    for (let i = 0; i < result.length; i++) {
        const instance = result[i];
        _instance.set(instance.id, instance);
    }
}

_event.on('instance:update', instanceUpdate);

module.exports = (function (repository) {
    _repository = repository;

    return {
        getList,
        add,
        remove,
        __private__: {
            instanceUpdate,
            _instance
        }
    };
});
