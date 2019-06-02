const app = require('./app');
const server = require('http').createServer(app);
import logger from './component/log/log';
import repository from './component/instance/instanceRepository';
const manager = require('./component/instance/instance-manager');
const im = manager(repository);
const rippleApp = require('./ripple-app')(server);

module.exports = function () {
    return {
        start: (port) => {
            server.listen(port, async () => {
                logger.info('listen');
                rippleApp.updateInstance((await im.getList()));
            });

            server.on('close', () => {
                logger.info('Server is closed');
            });

            return server;
        }
    }
};

module.exports.__private__ = {
    rippleApp,
    im
};
