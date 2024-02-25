const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     required: true
    // },
    // isbn: {
    //     type: String,
    //     required: true
    // },
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
    Name: {
        type: String,
        required: true
    },
    RatingDist1: {
        type: String,
        required: false
    },
    RatingDist2: {
        type: String,
        required: false
    },
    RatingDist3: {
        type: String,
        required: false
    },
    RatingDist4: {
        type: String,
        required: false
    },
    RatingDist5: {
        type: String,
        required: false
    },
    pagesNumber: {
        type: Number,
        required: true
    },

    RatingDistTotal: {
        type: String,
        required: false
    },
    PublishMonth: {
        type: Number,
        required: false
    },
    PublishDay: {
        type: Number,
        required: false
    },
    Publisher: {
        type: String,
        required: false
    },
    CountsOfReview: {
        type: Number,
        required: false
    },
    PublishYear: {
        type: Number,
        required: false
    },
    Language: {
        type: String,
        required: false
    },
    Authors: {
        type: String,
        required: false
    },
    Rating: {
        type: String,
        required: false
    },
    ISBN: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
});
//done 300-400k import
module.exports = Book = mongoose.model('book', BookSchema);