import { EventEmitter } from "events";

describe('ripple es6', () => {
    const ripple = require('../src/ripple');
    const message = JSON.stringify({
        id: '1',
        name: 'instance1',
        config: {}
    });
    class MockSocket extends EventEmitter {
        constructor() {
            super();
        }

        to(id) {
            return this;
        }

        join(ids, ecb) {
            ecb(ids);
        }

        leave(socket, ids, ecb) {
            if (ecb) {
                ecb(ids);
            }
        }
    }

    test('ripple is defined', () => {
        expect(ripple).toBeDefined();
    });

    test('confirm message\'s delimeter', () => {
        expect(ripple.confirmDelimeter(message)).toBeFalsy();
        expect(ripple.confirmDelimeter(`${message}!`)).toBeTruthy();
    });

    test('push messages to rooms', () => {
        const socket = new MockSocket();
        socket.on('message', (msg) => {
            expect(msg).toEqual(message);
        });
        ripple.pushMessage(socket, ['1', '2'], message);
    });

    test('send messages', () => {
        const socket = new MockSocket();
        const ids = ['1', '2'];
        expect(ripple.sendMessage(socket, ids, message)).toEqual(message);
        expect(ripple.sendMessage(socket, ids, `${message}!`)).toEqual('');
    });

    test('join the single room', () => {
        const socket = new MockSocket();
        const ids = ['1', '2'];
        ripple.join(socket, ids, (id) => {
            expect(id).toEqual(ids);
        });
    });

    test('leave the single room', () => {
        const socket = new MockSocket();
        const ids = ['1', '2'];
        ripple.leave(socket, ids, (id) => {
            expect(id).toEqual(ids);
        });
    });
});