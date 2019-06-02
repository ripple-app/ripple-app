const env = require('./src/config/config');
const Server = require('./src/server');
const server = new Server();
server.start(env.port);
