var fs = require("fs");

function formatDictionary(dictionaryString) {
  var lines = dictionaryString.split("\n");
  lines = lines.filter(function(line) {
    return !line.match(/\(|\{|\}/) && line.match(/\w+/);
  });
  return lines.map(function(line) {
    return line.split("  ");
  });
}

function countSyllables(pronunciation) {
  var syllables = pronunciation.match(/\d/g);
  return syllables ? syllables.length : 0;
}

function arrayBySyllables(dictionaryString) {
  var dictionaryLines = formatDictionary(dictionaryString);
  var wordsBySyllables = {};
  dictionaryLines.forEach(function(word) {
    var syllables = countSyllables(word[1]);
    wordsBySyllables.hasOwnProperty(syllables) || (wordsBySyllables[syllables] = []);
    wordsBySyllables[syllables].push(word[0]);
  });
  return wordsBySyllables;
}

module.exports = {
  arrayBySyllables: arrayBySyllables
};
