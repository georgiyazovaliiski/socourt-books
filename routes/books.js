const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req,res) =>{
    Book.find()
        .then(books=>res.json(books))
        .catch(error => res.status(400).json('Error: ' + error))
});

router.route('/:id').get((req,res) =>{
    Book.findById(req.params.id)
        .then(books=>res.json(books))
        .catch(error => res.status(400).json('Error: ' + error))
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const author = req.body.author;
    const genre = req.body.genre;
    const newBook = new Book({name, author, genre});

    newBook.save()
        .then(() => res.json('Book added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/search').post((req,res) => {
    const nameOfSearch = req.body.name;

    Book.find({name: nameOfSearch}).then(books => res.json(books));
})

module.exports = router;