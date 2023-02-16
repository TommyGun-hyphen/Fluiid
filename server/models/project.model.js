const mongoose = require('mongoose');

const Project = mongoose.model("Project", new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    isPublic: {type: Boolean, default: false},
    creation_date: {type: Date, required: true},
    last_date: {type: Date, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            permissions: [
                {
                    type: String
                }
            ]
        }
    ],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }]
}))

module.exports = Project;