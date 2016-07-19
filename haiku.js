var fs = require('fs');
var haikuSyllables = require('./haiku_syllables');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file) {
  return fs.readFileSync(file).toString();
}

function createHaiku(structure) {
  var wordBank = haikuSyllables.arrayBySyllables(cmudictFile);
  var haiku = [];
  for (var i = 0; i < structure.length; i++) {
    var haikuLine = [];
    var remainingSyllables = structure[i];
    while (remainingSyllables > 0) {
      var randomSyllableCount = Math.ceil(Math.random() * remainingSyllables);
      var wordsMatchingSyllables = wordBank[randomSyllableCount];
      var randomWordIndex = Math.ceil(Math.random() * wordsMatchingSyllables.length);
      haikuLine.push(wordsMatchingSyllables[randomWordIndex]);
      remainingSyllables -= randomSyllableCount;
    }
    haiku.push(haikuLine.join(" "));
  }
  return haiku.join("\n");
}

module.exports = {
  createHaiku: createHaiku,
};
