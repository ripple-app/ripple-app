const router = require('express').Router();
const errorHandler = require('../error/error-handler');
import repository from './instanceRepository';
const manager = require('./instance-manager');
const im = manager(repository);
const logger = require('../log/log');

router.get('/', async (req, res) => {
    try {
        const result = await im.getList();
        logger.debug(result);
        res.status(200).json(result);
    } catch (err) {
        errorHandler.emit('error', err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await im.add(req.body);
        logger.debug(result);
        res.status(200).json(result);
    } catch (err) {
        errorHandler.emit('error', err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await im.remove(id);
        res.status(200).json(result);
    } catch (err) {
        errorHandler.emit('error', err);
        res.status(500).json(err);
    }
});

module.exports = router;
module.exports.__private__ = {
    im
};
