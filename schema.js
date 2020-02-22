// Define a plan for a collection

const mongoose = require('mongoose');

// Schema for a colletion of voters
const Voter = new mongoose.Schema({
  firstname: String,
  lastname: String,
  zipcode: Number,
  history: String
});

// Speed up queries on all fields
Voter.index({name: 1});
Voter.index({rank: 1});
Voter.index({started: 1});
Voter.index({courses: 1});

//Compile and export this Schema
module.exports = mongoose.model('Voter', Voter);
