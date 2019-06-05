import { InstanceRepository } from '../src/component/instance/instanceRepository';
const sinon = require('sinon');
import Instance from '../src/component/model/instance';

describe('instance repository test', () => {
    let repository;

    beforeAll(() => {
        repository = new InstanceRepository(Instance);
    });

    afterEach(() => {
        sinon.restore();
    });

    test('repository correct generated', () => {
        expect(repository).toBeDefined();
    });

    test('find test', async () => {
        sinon.stub(Instance, 'find').returns([
            {
                id: '1',
                name: 'instance1',
                config: {}
            }
        ]);

        const result = await repository.find();
        const instance = result[0];

        expect(instance.id).toBe('1');
        expect(instance.name).toBe('instance1');
        expect(instance.config).toEqual({});
    });

    test('add', async () => {
        const instance = repository.create({
            id: '2',
            name: 'instance2',
            config: {}
        });
        
        const mock = sinon.mock(instance);
        
        mock.expects('save').resolves();

        const result = await repository.add(instance);

        mock.verify();
        expect(result).toBeUndefined();
    });

    test('create', async () => {
        const result = repository.create({
            id: '2',
            name: 'instance2',
            config: {}
        });
        expect(result).toBeDefined();
    });

    test('remove', async () => {
        sinon.stub(Instance, 'findOneAndRemove').resolves();
        
        const result = await repository.remove('1');

        expect(result).toBeUndefined();
    });
})
