'use strict';

describe('ripple app is', () => {
    const server = require('http').createServer();
    const rippleApp = require('../src/ripple-app')(server);
    beforeEach((done) => {
        server.listen('5000', (err) => {
            if (err) {
                done(err);
            }

            done();
        });
    })

    afterEach((done) => {
        server.on('close', () => {
            done();
        });
        server.close();
    })

    test('server is defined', () => {
        expect(server).toBeDefined();
    });

    test('connect server from client', () => {
        rippleApp.updateInstance([{
            id: '1',
            name: 'instnace1',
            config: {}
        }]);
        const _instance = require('../src/ripple-app').__private__._instance;
        expect(_instance.get('1')).toBeDefined();
    });

    test('send message to server', async (done) => {
        const pro1 = new Promise((resolve, reject) => {
            const cio = require('socket.io-client');
            const client = cio('ws://localhost:5000', {
                query: {
                    token: ['1']
                },
                transports: ['websocket']
            });

            setTimeout(() => {
                resolve(client);
            }, 100);
        });
        const socket = await pro1;
        console.log(socket.on, socket.emit);
        socket.on('data', (message) => {
            console.log(message);
            expect(message).toBe(JSON.stringify({ id: '1', name: 'config1' }));
            
        });
        socket.emit('data', JSON.stringify({ id: '1', name: 'config' }));
        socket.close();
            done();
    });
});