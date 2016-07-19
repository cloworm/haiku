var fs = require('fs');

function createHaiku(structure) {
  //takes any number of arguments and puts each into array
  //for each number in array, look at same index from haiku_syllable array
  //use Math.random to generate a random number <= structure
  //take random word from array of index # generated
  //structure # - random #
  //generate random number <= structure remaining
  //repeat until # = 0
  // if # = 1 find 1
  // go to next # in structure
  console.log("this should log a haiku with the structure " + structure);
}

module.exports = {
  createHaiku: createHaiku,
};

