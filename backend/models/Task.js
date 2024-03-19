const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: Number,
        required: true,
        // default: 0
    },
    dueDate: {
        type: Date,
        required: false
    },
    subject: {
        type: Array,
        required: false
    },
    boardId: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

});
module.exports = Task = mongoose.model('task', TaskSchema);