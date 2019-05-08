var fs = require('fs');
// utf8없이 출력하면 글자가 16진수로 나와서 깨짐.
fs.readFile('sample.txt', 'utf8', function(err, data){
    console.log(data);
});
