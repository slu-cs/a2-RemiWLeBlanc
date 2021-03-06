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

const voters = [];

// Asynchronous line-by-line input
file.on('line', function(line) {
  var values= line.split(',');

  // put the election history into an array
  var str = values[3];
  var elections = [];
  if(str !== undefined){ // if they ever voted
    for (var i = 0; i < str.length; i=i+4) {
      elections.push(str.substring(i, i+4));
    }
  }
  const voter = new Voter({
    firstname: values[0],
    lastname: values[1],
    zipcode: values[2],
    history: elections
  });

  voters.push(voter);
})

// End the program when the file closes
file.on('close', function() {
 // reset the data
  mongoose.connection.dropDatabase()
    .then(() => Promise.all(voters.map(voter => voter.save())))
    .then(() => mongoose.connection.close())
    .catch(error => console.error(error.stack));
});
