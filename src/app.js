const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./component/error/error-handler');
const mongoose = require('mongoose');
const env = require('./config/config');
const mongo = env.mongo;
const mongoDB = `mongodb://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.dbname}`;
const mongoDBOptions = mongo.options;

mongoose.connect(mongoDB, mongoDBOptions, (err) => {
    if (err) {
        errorHandler.emit('error', err);
    }
});
mongoose.Promise = global.Promise;

const conn = mongoose.connection;

conn.on('error', (err) => {
    errorHandler.emit('error', err);
});

conn.on('reconnect', (err) => {
    errorHandler.emit('error', err);
});

const instanceController = require('./component/instance/instanceController');

app.use(express.json());
app.use(cors());
app.use('/instance', instanceController);
module.exports = app;