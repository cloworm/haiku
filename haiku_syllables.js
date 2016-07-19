var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

// for each line, count how many numbers, n are in it
// put first word into an array with index n

function readCmudictFile(file) {
  return fs.readFileSync(file).toString();
}

function formatData(data) {
  var lines = data.toString().split("\n");
  var lineSplit = [];
  lines.forEach(function(line) {
    if (!line.match(/\(|\{|\}/)) {
      lineSplit.push(line.split("  "));
    }
  });
  return lineSplit;
}

function countSyllables(pronunciation) {
  var syllables = pronunciation.match(/\d/g);
  if (syllables) {
    return syllables.length;
  }
}

function arrayBySyllables(data) {
  var dictionaryLine = formatData(data);
  var syllables = 0;
  var wordsBySyllables = [];
  dictionaryLine.forEach(function(word) {
    syllables = countSyllables(word[1]);
    console.log(word, syllables);
  });
}

console.log(arrayBySyllables(cmudictFile));
