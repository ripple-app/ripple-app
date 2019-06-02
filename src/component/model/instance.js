import mongoose from 'mongoose';

const instanceSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    config: {
        type: Object
    },
    regDate: {
        type: Date
    }
});

const Instance = mongoose.model('Instance', instanceSchema);
module.exports = Instance;
