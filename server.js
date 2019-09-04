const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const verify = require('./routes/verifyjwt')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.API_URI;
mongoose.connect(
    uri,
    {
      useNewUrlParser:true,
      useCreateIndex:true
    }
).catch((error) => console.log("Error: " + error));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
})


const booksRouter = require('./routes/books');

const authRouter = require('./routes/auth');
const genreRouter = require('./routes/genres');

app.use('/api/books', booksRouter);
app.use('/api/genres',verify, genreRouter);
app.use('/api/auth', authRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})