const request = require('supertest');
const sinon = require('sinon');

describe('instance controller', () => {
    const app = require('express')();
    const controller = require('../src/component/instance/instanceController');
    app.use('/instance', controller);

    test('getInstnace', (done) => {
        const mock = sinon.mock(controller.__private__.im);
        mock.expects('getList').resolves([]);

        request(app)
            .get('/instance')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                mock.verify();
                
                if (err) {
                    done(err);
                }

                expect(response.body).toEqual([]);
                done();
            });
    });

    test('should getList method throw error', (done) => {
        const mock = sinon.mock(controller.__private__.im);
        mock.expects('getList').once().throwsException(new Error('throw error'));

        request(app)
            .get('/instance')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, response) => {
                mock.verify();

                if (err) {
                    expect(err).toEqual(new Error('throw error'));
                    done(err);
                }

                done();
            });
    })

    test('addInstance', (done) => {
        const mock = sinon.mock(controller.__private__.im);
        mock.expects('add').resolves(undefined);

        request(app)
            .post('/instance')
            .send({
                id: '3',
                name: 'instance3',
                config: {}
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                mock.verify();

                if (err) {
                    done(err);
                }

                expect(response.body).toEqual('');
                done();
            });
    });

    test('should add method throw error', (done) => {
        const mock = sinon.mock(controller.__private__.im);
        mock.expects('add').once().throwsException(new Error('duplicate item'));

        request(app)
            .post('/instance')
            .send({
                id: '3',
                name: 'instance3',
                config: {}
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, response) => {
                mock.verify();

                if (err) {
                    expect(response.body).toEqual(new Error('duplicate item'));
                    done(err);
                }

                done();
            });
    });

    test('deleteInstance', (done) => {
        const mock = sinon.mock(controller.__private__.im);
        mock.expects('remove').resolves(undefined);

        request(app)
            .delete('/instance/3')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                mock.verify();

                if (err) {
                    done(err);
                }

                expect(response.body).toEqual('');
                done();
            });
    });

    test('should delete method throw error cause id property is empty', (done) => {
        const mock = sinon.mock(controller.__private__.im);
        mock.expects('remove').once().throwsException(new Error('uknown error'));

        request(app)
            .delete('/instance/:id')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, response) => {
                mock.verify();

                if (err) {
                    expect(response.body).toEqual(new Error('uknown error'));
                    done(err);
                }

                done();
            });
    });
});