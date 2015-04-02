# code-challenge
### Objective
Parse the data dump and make the data accessible in a structured, RESTful manner.

### Version
1.0.0

### Tech

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework 
* [MongoDB] - document-oriented database 
* [Mongoose] - provides MongoDB object mapping 
* [swagger-ui] - REST API documentation

### Installation
1. Install [MongoDB] and [node.js]
2. From a tab in your Terminal, start MongoDB in the background
```sh
$ mongod
``` 
3. From another tab in your Terminal, start the app
```
$ git clone https://github.com/kswin/code-challenge.git code-challenge
$ cd code-challenge
$ npm install -g gulp && npm install //get dependencies. installs gulp globally for easier development
$ npm build
$ npm start
```

### Usage
- Parse data dump and upload to REST API
```
$ cd code-challenge/parser/src
$ node parse.js /assets/smarterer_code_challenge_question_dump.csv ~/parser_output.json 
$ API_HOST=kwin-code-challenge.herokuapp.com PORT=80 node parser/src/upload.js ~/parser_output.json
```

- [Read api docs](http://kwin-code-challenge.herokuapp.com/api-docs/)
    - You can experiment with the REST calls from Swagger UI directly or us a different REST client like Postman
    -  [Swagger UI does not support multiple query params] at the moment


### Development Notes
- Run unit tests:
```
$ npm test
```


----

#### Nice to haves
- Parser
    - Add decimals support
    - Create a front end for the parser
- Security
    - SSL? CORS? OAuth?
- Development
    - JSHint
- Rest API
    - Add query param to return only specific fields
    - Add "X-Total-Count" in response header for item total 
    - Add "Link" for next/previous pages in response header
    - Change baseurl to use api/v1
    - [Pagination optimization to avoid using .skip()](https://sammaye.wordpress.com/2012/05/25/mongodb-paging-using-ranged-queries-avoiding-skip/)


----

[MongoDB]:http://docs.mongodb.org/manual/
[node.js]:http://nodejs.org
[express]:http://expressjs.com
[Mongoose]:http://mongoosejs.com/docs/guide.html
[swagger-ui]: https://github.com/swagger-api/swagger-ui
[Swagger UI does not support multiple query params]: https://github.com/swagger-api/swagger-ui/issues/987
