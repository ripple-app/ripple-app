import Instance from '../model/instance';

export class InstanceRepository {
    constructor(instance) {
        this.Instance = instance;
    }

    async find() {
        return this.Instance.find();
    }

    create(param) {
        return new (this.Instance)({
            id: param.id,
            name: param.name,
            config: param.config
        });
    }

    async add(instance) {
        await instance.save();
    }

    async remove(id) {
        await this.Instance.findOneAndRemove({ id: id });
    }
}

export default new InstanceRepository(Instance);
