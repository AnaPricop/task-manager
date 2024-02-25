const express = require('express');
const router = express.Router();
const axios = require('axios');
// Load Book model
const Book = require('../../models/Book');
var arr = [];
const fetchBooks = async (source) => {
    // Ajax call to API using Axios
   // console.log(source)
    const result = await axios.get(source);
    // Books result
    //console.log(result.data.items[0].volumeInfo);
    if (result.data.items[0].volumeInfo && result.data.items[0].volumeInfo.imageLinks)
        arr.push(result.data.items[0].volumeInfo.imageLinks.thumbnail);
       // console.log(result.data.items[0].volumeInfo.imageLinks.thumbnail);
}
// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get('/', (req, res) => {

    Book.find().limit(20)
        .then(books => {
            // console.log(books)
            // for (var i in books)
            // {const source = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + books[i].ISBN + '&key=AIzaSyALUqixGB1zvcdMCqlNcpQdmJ5o9NtDIxk';
            //     if (books[i] && (books[i].image == null || books[i].image == undefined || books[i].image == 'undefined' || books[i].image == ''))
            //     {fetchBooks(source);
            //     // else
            //     // {
            //     //     var book_update = {
            //     //         image: arr[i]
            //     //     }
            //     //     Book.findByIdAndUpdate(books[i].id, book_update)
            //     //         .then(book => console.log("updated", book))
            //
            //     //}
            //     books[i] =  books[i].map( data => ({...data, image:arr[i]}) );}
            //  console.log(books[i].image)
            // }

            res.json(books)})
        .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// @route   GET api/books/:id
// @desc    Get single book by id
// @access  Public
router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

// @route   POST api/books
// @desc    Add/save book
// @access  Public
router.post('/', (req, res) => {
    Book.create(req.body)
        .then(book => res.json({ msg: 'Book added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

// @route   PUT api/books/:id
// @desc    Update book by id
// @access  Public
router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

// @route   DELETE api/books/:id
// @desc    Delete book by id
// @access  Public
router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = router;