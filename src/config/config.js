const env = process.env.NODE_ENV;
let config;

if (env === 'prod') {
    config = require('../../environment/prod.json');
}else {
    config = require('../../environment/dev.json');
}

module.exports = (() => {
    return config;
})();
