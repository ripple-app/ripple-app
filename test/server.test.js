const Server = require('../src/server');

const sinon = require('sinon');

describe('server', () => {
    afterEach(() => {
        sinon.restore();
    });
    test('start', (done) => {
        const im = Server.__private__.im;
        const mock = sinon.mock(im);
        mock.expects('getList').resolves([]);
        const server = new Server().start('5000');

        setTimeout(() => {
            server.on('close', () => {
                done();
            });
            server.close();
        })
    })
});