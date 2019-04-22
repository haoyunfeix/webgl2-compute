var fs = require('fs');
var path = require('path');
var readline = require('readline');

var file = '00_test_list.txt';
var pattern = {};

function copyFileSync( source, target ) {

  var targetFile = path.join( target, path.basename( source ) );

  if ( fs.existsSync( target ) && fs.lstatSync( target ).isDirectory()) {
  } else {
    fs.mkdirSync( target, { recursive: true })
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function parseLine(line) {
  if (!line.startsWith('//')) {
    var folder = line.split('/')[0];
    var file = line.split('/')[1];
    if(folder && file) copyFileSync(path.join('tests', file), folder);
  }
}

var lineReader = readline.createInterface({
  input: fs.createReadStream(file)
});

lineReader.on('line', function (line) {
  parseLine(line);
});
