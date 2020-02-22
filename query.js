// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

/*// What documents are in the collection?
const query = Professor.find();
query.exec(function(error, professors) {
  if (error) console.error(error.stack);
  console.log(professors);
});*/

const queries = [
  // How many registered voters live in the Canton zip code (13617)?
  Voter.find().where('zipcode').equals(13617),

  // What are the full names of all the registered voters whose first-name is STARR?
  Voter.find().where('firstname').equals('STARR'),

  // How many people voted in the 2016 general election (GE16)?
  Voter.find().where('history').in("GE16"),

  // What is the last-name that comes last in the county in alphabetical order?
  Voter.find().sort('-lastname').limit(1),

  // How many zip codes does the county contain?
  Voter.distinct('zipcode')
];

Promise.all(queries)
  .then(function(results) {
    console.log('Number of registered voters in Canton: ', results[0].length);
    console.log('Full names of those whose name is STARR: ', results[1].map(p => p.firstname).toString(), results[1].map(p => p.lastname).toString());
    console.log('Number of people who voted in 2016 general election: ', results[2].length);
    console.log('The last name alphabetically: ', results[3].map(p => p.lastname).toString());
    console.log('Number of zipcodes in the county: ', results[4].length);
    // console.log('Started in 2003: ', results[2].map(p => p.name));
    // console.log('Teaches 362: ', results[3].map(p => p.name));
    // console.log('Distinct ranks: ', results[4]);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));

// // Professor.find().sort('name')
// let count = 0;
// queries[0].exec(function(error, professors) {
//   if (error) console.error(error.stack);
//
//   count++;
//   // const names = professors.map(p => p.name);
//   // console.log('Names in order: ', names);
// });
// console.log('Number of registered voters in Canton: ', count);
