# web2-nodejs

```
[Node.js - 설치, 웹서버 만들기]
node.js runtime을 설치해서 node.js를 구동 시킬 것임.
javascript언어로 node.js app을 만들어보자!
js파일을 실행시키려면
-> $ node helloworld.js

node.js는 웹서버 기능을 갖고 있어서 웹 페이지를 보여줄 수 있음.
$ node main.js
를 실행 시키면 쉘 자체가 웹 서버 역할이 되고
localhost:3000 (3000은 listen값)에서 웹 페이지를 볼 수 있음


[JavaScript - Template Literal]
줄바꿈을 하고 싶을 때 ``로 문자열을 묶자
변수는 + var + 로 묶는게 아니라 ${var} 로 표기

[Node.js - URL로 입력된 값 사용하기]
- URL의 의미
http://opentutorials.org:3000/main?id=HTML&page=12
http : protocol
opentutorials.org : host(domain)
3000 : port (한 컴퓨터에 여러 서버가 있을 수 있으니 어떤 서버로 접속할 지 선택)
main : path
id=HTML&page=12 : query string(웹 서버에게 데이터를 전송할 수 있음)

- Node.js에서 URL을 통해서 입력된 값을 사용하는 방법
검색어 : nodejs url parse query string
    var queryData = url.parse(request.url, true).query;
    if (queryData.name) {
        // user told us their name in the GET request, ex: http://host:8000/?name=Tom


```


출처 : 생활코딩 - WEB2 - Node.js
https://opentutorials.org/course/3332
https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3129/7333.jpg
