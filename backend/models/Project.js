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
    idBoards: {
        type: Array,
        required: false
    },
    idMembers: {
        type: Array,
        required: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
    // author: {
    //     type: String,
    //     required: true
    // },
    // description: {
    //     type: String
    // },
    // published_date: {
    //     type: Date
    // },
    // publisher: {
    //     type: String
    // },
    // updated_date: {
    //     type: Date,
    //     default: Date.now
    // }
});
//done 300-400k import
module.exports = Project = mongoose.model('project', ProjectSchema);