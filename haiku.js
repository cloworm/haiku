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

function createHaikuFromBook(structure, book) {
  var haiku = structure.map(function(syllables) {
    var haikuLine = randomBookLine(book);
    var totalLineSyllables = countBookLineSyllables(haikuLine);
    while (totalLineSyllables !== syllables) {
      haikuLine = randomBookLine(book);
      totalLineSyllables = countBookLineSyllables(haikuLine);
    }
    return haikuLine.join(" ");
  });
  return haiku.join("\n");
}

function randomBookLine(book) {
  var bookByLine = book.replace(/\r\n|\-+/g, " ").replace(/\'/g).split(/\.|\?|\!|\,/g);
  var randomLineIndex = Math.floor(Math.random() * bookByLine.length);
  var randomLine = bookByLine[randomLineIndex].split(/\s/)
  randomLine.shift();
  return randomLine;
};

function countBookLineSyllables(line) {
  var syllables = 0;
  var syllablesCounted = 0;
  var wordBank = haikuSyllables.arrayBySyllables(cmudictFile);
  line.forEach(function(word) {
    for(var key in wordBank) {
      if (wordBank[key].includes(word.toUpperCase())) {
        syllables += parseInt(key);
        syllablesCounted++;
      }
    }
  })
  if (syllablesCounted !== line.length) {
    syllables = 0;
  }
  return syllables;
}

module.exports = {
  createHaiku: createHaiku,
  createHaikuFromBook: createHaikuFromBook
};
