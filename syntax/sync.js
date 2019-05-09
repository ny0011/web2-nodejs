var fs = require('fs');

// // readFileSync. A, B, C 순차적으로 실행됨
// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt', 'utf8')
// console.log(result);
// console.log('C')


// readFile. B가 처리되는 속도가 느리면 C가 먼저 실행됨.
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});

console.log('C')
