const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    idBoards: {
        type: Array,
        required: false
    },
    idMembers: {
        type: Array,
        required: false
    },
    progress: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
module.exports = Project = mongoose.model('project', ProjectSchema);