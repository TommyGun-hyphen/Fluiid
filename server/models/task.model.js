const mongoose = require('mongoose');

const Task = mongoose.model('Task', new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    creation_date: {type:Date, required: true},
    last_date: {type:Date, required: true},
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
}));

module.exports = Task;