# A2
CS332 Assignment #2

Citations: 

Data creation issue:
  - The database is being dropped before every new voter is saved, so the database can contain at most one voter.
  - The process may quit before the last voter can finish saving, so the database may contain no voters at all.
  - See create.js for suggested fixes.
