const log4js = require('log4js');
let logger;

log4js.configure({
    appenders: {
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'INFO' }
    }
})

if (!logger) {
    logger = log4js.getLogger();
}

module.exports = logger;
