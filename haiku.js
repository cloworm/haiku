var fs = require('fs');
var haikuSyllables = require('./haiku_syllables');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file) {
  return fs.readFileSync(file).toString();
}

// function createHaiku(structure) {
//   var wordBank = haikuSyllables.arrayBySyllables(cmudictFile);
//   return structure.map(function(n) {
//     return wordBank[n][2];
//   }).join("\n");
// };

function createHaiku(structure) {
  var wordBank = haikuSyllables.arrayBySyllables(cmudictFile);
  var haiku = [];
  for (var i = 0; i < structure.length; i++) {
    var haikuLine = [];
    var remainingSyllables = structure[i];
    var randomWordIndex = 0;
    var randomWord;
    while (remainingSyllables > 0) {
      randomWordIndex = Math.ceil(Math.random() * remainingSyllables);
      randomWord = Math.ceil(Math.random() * wordBank[randomWordIndex].length);
      haikuLine.push(wordBank[randomWordIndex][randomWord]);
      remainingSyllables -= randomWordIndex;
    }
    haiku.push(haikuLine.join(" "));
  }
  return haiku.join("\n");
}

module.exports = {
  createHaiku: createHaiku,
};

