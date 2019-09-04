const router = require('express').Router();
let Genre = require('../models/genre.model');

router.route('/').get((req,res) =>{
    Genre.find()
        .populate('books','-genre')
        .then(genres=>res.json(genres))
        .catch(error => res.status(400).json('Error: could not get all genres.'))
});

router.route('/:id').get((req,res) =>{
    Genre.findById(req.params.id)
        .select('books -_id')
        .populate('books', '-genre')
        .then(books=>res.json(books))
        .catch(error => res.status(400).json(`Error: not able to get genre with ID ${req.params.id}`))
});

router.route('/search').post((req,res) => {
    const nameOfSearch = req.body.name;

    Genre.find({name: nameOfSearch})
        .select('books')
        .populate('books', 'name author')
        .exec()
        .then(genre => res.json({result: genre.books}));
})

// DELETE BEFORE SENDING
router.route('/').post((req, res) => {
    const name = req.body.name;
    const newBook = new Genre({name});

    newBook.save()
        .then(() => res.json('Book added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;