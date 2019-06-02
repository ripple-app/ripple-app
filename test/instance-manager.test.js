'use strict';

import { InstanceRepository } from '../src/component/instance/instanceRepository';
import InstanceManager from '../src/component/instance/instance-manager';
import Instance from '../src/component/model/instance';

class MockRepository extends InstanceRepository {
    constructor(domain) {
        super(domain);
        this.instance = {};
        this.instance['1'] = {
            id: '1',
            name: 'instance1',
            config: {}
        };
        this.shotThrow = false;
    }

    async find() {
        return new Promise((resolve, reject) => {
            if (!this.shotThrow) {
                const array = [];
                for (const id of Object.keys(this.instance)) {
                    array.push(this.instance[id]);
                }
                resolve(array);
            } else {
                reject([]);
            }

        });
    }

    async add(param) {
        return new Promise((resolve, reject) => {
            this.instance[param.id] = param;
            resolve();
        });
    }

    async remove(id) {
        return new Promise((resolve, reject) => {
            delete this.instance[id];
            resolve();
        });
    }
}

describe('instance manager', () => {
    let manager;
    const repository = new MockRepository(Instance);

    beforeAll(() => {
        manager = new InstanceManager(repository);
    });

    afterAll(() => {
    })

    test('instance find', async () => {
        const result = await manager.getList();
        const instance = result[0];

        expect(instance.id).toBe('1');
        expect(instance.name).toBe('instance1');
        expect(instance.config).toEqual({});
    });

    test('throws instnace find', async () => {
        repository.shotThrow = true;
        const result = await manager.getList();
        repository.shotThrow = false;
        expect(result).toEqual([]);
    });

    test('instance add', async () => {
        const result = await manager.add({
            id: '2',
            name: 'instance2',
            config: {}
        });
        const list = await manager.getList();
        expect(result).toBeUndefined();
        expect(list.length).toBe(2);
    });

    test('update instance in instance-manager', async (done) => {
        const result = await manager.add({
            id: '2',
            name: 'instance2',
            config: {}
        });

        manager.__private__.instanceUpdate();
        setTimeout(() => {
            expect(manager.__private__._instance.get('2')).toBeDefined();
            done();
        });
    });

    test('remove data in repository', async () => {
        const before = await manager.getList();
        expect(before.length).toBe(2);

        const result = await manager.remove('2');

        const after = await manager.getList();
        expect(after.length).toBe(1);
    });
});