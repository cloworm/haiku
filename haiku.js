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
  var wordBank = haikuSyllables.arrayBySyllables(cmudictFile);
  line.forEach(function(word) {
    for(var key in wordBank) {
      if (wordBank[key].includes(word.toUpperCase())) {
        syllables += parseInt(key);
      }
    }
  })
  return syllables;
}
// function createHaikuFromBook(structure, book) {
//   // split book up into array by sentences
//   // add up syllable count of sentences
//   // add each sentence to an object
//   // return random line matching necessary syllables
//   var bookByLine = book.replace(/\r\n/g, " ").split(/\.|\?|\!/g);
//   var haikuLine = [];
//   var haiku = structure.map(function(syllables) {
//     // while (haikuLine.length < 1) {
//       var randomSentenceIndex = Math.floor(Math.random() * bookByLine.length);
//       var randomSentence = bookByLine[randomSentenceIndex].split(/\s/);
//       randomSentence.shift();
//       var randomSentenceSyllables = convertSentenceToSyllables(randomSentence);
//       var haikuLine = returnHaikuLine(randomSentence, randomSentenceSyllables, syllables);
//       console.log(haikuLine);
//     // }
//     return haikuLine;
//   })
//   return haiku;
// }

// function convertSentenceToSyllables(randomSentence) {
//   var wordBank = haikuSyllables.arrayBySyllables(cmudictFile);
//   var syllableArray = [];
//   randomSentence.forEach(function(word) {
//     for (var key in wordBank) {
//       if (wordBank[key].includes(word.toUpperCase())) {
//         syllableArray.push(key);
//       }
//     }
//   });
//   return syllableArray;
// }

// function returnHaikuLine(randomSentence, randomSentenceSyllables, syllables) {
//   var haikuLine = [];
//   var syllableCount = 0;
//   for (var i = 0; i < randomSentence.length; i++) {
//     if (syllableCount < syllables) {
//       haikuLine.push(randomSentence[i]);
//       syllableCount += randomSentenceSyllables[i];
//     }
//   }
//   if (syllableCount !== syllables) {
//     haikuLine = [];
//   }
//   console.log(haikuLine);
//   return haikuLine;
// }

module.exports = {
  createHaiku: createHaiku,
  createHaikuFromBook: createHaikuFromBook
};
