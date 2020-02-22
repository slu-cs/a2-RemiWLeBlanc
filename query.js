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
];

// Promise.all(queries)
//   .then(function(results){
//     console.
//   });

// Professor.find().sort('name')
let count = 0;
queries[0].exec(function(error, professors) {
  if (error) console.error(error.stack);

  count++;
  // const names = professors.map(p => p.name);
  // console.log('Names in order: ', names);
});
console.log('Number of registered voters in Canton: ', names);
