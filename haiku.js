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
  var haiku = "";
  for (var i = 0; i < structure.length; i++) {
    var n = structure[i];
    var m = 0;
    var randomWord;
    while (n > 0) {
      m = Math.ceil(Math.random() * n);
      randomWord = Math.ceil(Math.random() * wordBank[m].length);
      haiku += wordBank[m][randomWord] + " ";
      n -= m;
    }
    haiku += "\n";
  }
  return haiku;
}

module.exports = {
  createHaiku: createHaiku,
};

