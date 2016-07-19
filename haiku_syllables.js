var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file) {
  return fs.readFileSync(file).toString();
}

function formatData(data) {
  var lines = data.toString().split("\n");
  var lineSplit = [];
  lines.forEach(function(line) {
    if (!line.match(/\(|\{|\}/) && line.match(/\w+/)) {
      lineSplit.push(line.split("  "));
    }
  });
  return lineSplit;
}

function countSyllables(pronunciation) {
  var syllables = pronunciation.match(/\d/g);
  if (syllables) {
    return syllables.length;
  } else {
    return 0;
  }
}

function arrayBySyllables(data) {
  var dictionaryLine = formatData(data);
  var syllables = 0;
  var wordsBySyllables = {};
  dictionaryLine.forEach(function(word) {
    syllables = countSyllables(word[1]);
    if (Array.isArray(wordsBySyllables[syllables])) {
      wordsBySyllables[syllables].push(word[0]);
    } else {
      wordsBySyllables[syllables] = [word[0]];
    }
  });
  return wordsBySyllables;
}

console.log(arrayBySyllables(cmudictFile));
