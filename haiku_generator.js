var haiku = require('./haiku');
var fs = require('fs');

if (process.argv[2]) {
  var book = fs.readFileSync(process.argv[2]).toString();
  console.log(haiku.createHaikuFromBook([5,7,5], book));
} else {
  console.log(haiku.createHaiku([5,7,5]));
}


