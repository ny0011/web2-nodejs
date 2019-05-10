var http = require('http');
var fs = require('fs');
var url = require('url'); // url은 모듈임. node.js에게 url 모듈을 사용한다고 알림
var qs = require('querystring');

function templateHTML(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
}

function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', function(error, filelist) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = templateList(filelist);
                var template = templateHTML(title, list,
                    `<h2>${title}</h2><p>${description}</p>`,
                    `<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(template); //웹 페이지로 내용을 전송. queryData.id 값을 보냄
            });

        } else {
            fs.readdir('./data', function(error, filelist) {
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list,
                        `<h2>${title}</h2><p>${description}</p>`,
                        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                        );
                    response.writeHead(200);
                    response.end(template); //웹 페이지로 내용을 전송. queryData.id 값을 보냄
                });
            });
        }
    } else if (pathname === '/create'){
        fs.readdir('./data', function(error, filelist) {
            var title = 'WEB - create';
            var list = templateList(filelist);
            var body = `
            <form action="http://localhost:3000/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `
            var template = templateHTML(title, list, body, '');
            response.writeHead(200);
            response.end(template); //웹 페이지로 내용을 전송. queryData.id 값을 보냄
        });

    }else if (pathname === '/create_process'){
        // post로 전송한 내용을 javascript에서 받으려면?

        var body = '';

        // 웹 페이지에 접속할 때마다 node.js가 항상 createServer(function(request, response)를 실행하게 됨.
        // request에 사용자가 서버로 보낸 내용이 있음
        // post로 보낸 데이터가 너무 많으면 프로그램이 꺼질 수 잇음
        // 그래서 callback이 될 때마다 데이터를 추가
        request.on('data', function(data){
            body = body + data;
        });

        // 데이터 받는게 끝나면 아래 구문을 실행시킴
        // 지금까지 받은 post 정보를 저장
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end('success');
            })
        });
    }
    else {
        response.writeHead(404);
        response.end('Not Found');
    }

});
app.listen(3000);
