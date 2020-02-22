// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const readline = require('readline');
const fs = require('fs');

connect(); // To the database

// File configuration
const file = readline.createInterface({
  input: fs.createReadStream("voters.csv")
});

// Asynchronous line-by-line input
file.on('line', function(line) {
  
  const voter = new Voter(line);

  // reset the data
  mongoose.connection.dropDatabase()
    .then(() => voter.save())
    .then(() => mongoose.connection.close())
    .then(() => console.log('Database is ready.'))
    .catch(error => console.error(error.stack));
});

// End the program when the file closes
file.on('close', function() {
  process.exit(0);
});
