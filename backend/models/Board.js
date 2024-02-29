const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: false
    },
    idProject: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

});
module.exports = Board = mongoose.model('board', BoardSchema);