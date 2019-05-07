var http = require('http');
var fs = require('fs');
var url = require('url'); // url은 모듈임. node.js에게 url 모듈을 사용한다고 알림

var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(_url);

    var queryData = url.parse(_url, true).query;
    console.log(queryData);
    console.log(queryData.id); // url의 query data로 ?id=HTML이라고 썼다면 HTML값이 출력됨

    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    response.end(queryData.id); // 웹 페이지로 내용을 전송. queryData.id 값을 보냄

});
app.listen(3000);
