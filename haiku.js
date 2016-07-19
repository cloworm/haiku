var fs = require('fs');
var haikuSyllables = require('./haiku_syllables');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file) {
  return fs.readFileSync(file).toString();
}

function createHaiku(structure) {
  var wordBank = haikuSyllables.arrayBySyllables(cmudictFile);
  var haiku = structure.map(function(remainingSyllables) {
    var haikuLine = [];
    while (remainingSyllables > 0) {
      var randomSyllableCount = Math.ceil(Math.random() * remainingSyllables);
      var wordsMatchingSyllables = wordBank[randomSyllableCount];
      var randomWordIndex = Math.ceil(Math.random() * wordsMatchingSyllables.length);
      haikuLine.push(wordsMatchingSyllables[randomWordIndex]);
      remainingSyllables -= randomSyllableCount;
    }
    return haikuLine.join(" ");
  });

  return haiku.join("\n");
}

module.exports = {
  createHaiku: createHaiku,
};
