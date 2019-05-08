var http = require('http');
var fs = require('fs');
var url = require('url'); // url은 모듈임. node.js에게 url 모듈을 사용한다고 알림

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;
    console.log(url.parse(_url, true));

    if(pathname === '/') {
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              <ol>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
              </ol>
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);   //웹 페이지로 내용을 전송. queryData.id 값을 보냄
        });
    }else{
        response.writeHead(404);
        response.end('Not Found');
    }






});
app.listen(3000);
