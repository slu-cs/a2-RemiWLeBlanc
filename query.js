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
  // Voters from Canton
  Voter.find().where('zipcode').equals(13617),
  Voter.find().where('firstname').equals('STARR')
  // Voter.find().where('history').includes('GE16')
];

Promise.all(queries)
  .then(function(results) {
    console.log('Number of registered voters in Canton: ', results[0].length);
    console.log('Full names of those whose name is STARR: ', results[1].map(p => p.firstname).toString(), results[1].map(p => p.lastname).toString());
    // console.log('Number of people who voted in 2016 general election: ', results[2].length);
    // console.log('Names in order: ', results[0].map(p => p.name));
    // console.log('Started most recently: ', results[1].map(p => p.name));
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
