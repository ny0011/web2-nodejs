// function a(){
//     console.log('A');
// }

// 이름이 없음. 익명 함수
// javascript는 함수가 값임!
var a = function (){
    console.log('A');
}

// callback은 a 함수를 갖게 됨.
// 그래서 a()를 실행시키게 됨
function slowfunc(callback){
    callback();
}

slowfunc(a);
