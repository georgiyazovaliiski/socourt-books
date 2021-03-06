const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    author: {
        type: String,
        required: true,
        trim:true
    },
    genre: {
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Genre'
    }},
    {
        timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}
    }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;