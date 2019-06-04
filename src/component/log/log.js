const log4js = require('log4js');
let logger;

log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%[[%d] [%p]%] - %m (%f: %l) %n'
            }
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'INFO' , enableCallStack: true}
    }
})

if (!logger) {
    logger = log4js.getLogger();
}

module.exports = logger;
