var express = require('express');
var mongoose = require('mongoose');
var baucis = require('baucis');


// Connect to the Mongo instance
mongoose.connect('mongodb://localhost/ractivetodos');

// Create a Mongoose schema
var Todo = new mongoose.Schema({
  title: String,
  completed: Boolean
});


// Register the schema
mongoose.model('todo', Todo);

// Create the API routes
baucis.rest({
  singular: 'todo',
  plural: 'todo'
});

// Create the app and listen for API requests
var app = express();

app.use(express.bodyParser());
app.use(express.static('public'))
app.use('/api/v1', baucis());
app.listen(process.env.PORT || 3333);

console.log('Server listening on port 3333.');