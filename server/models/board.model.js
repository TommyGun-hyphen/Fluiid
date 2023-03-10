const mongoose = require('mongoose');

const Board = mongoose.model('Board', new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required: false},
    creation_date: {type:Date, required: true},
    last_date: {type:Date, required: true},
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
}));

module.exports = Board;