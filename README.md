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
$ DEBUG=code-challenge:* npm start
```

### Development
1. Run unit tests
```
$ npm test
```

### TODOs
=================
- Error Handlers
    - not found 404
    - bad request 400 (e.g. invalid params)
    - generic 500
    - Limit the distractors length
    - Unit test validation
=================
    - Unit test for filters/error setup?
=================
- Add Accept Headers?
- update swagger docs with new params for GETs/errors
- Create instructions on how to use the REST API and parser (Swagger UI has a bug with multi params https://github.com/swagger-api/swagger-ui/issues/987)

#### Nice to haves
- [Parser]: Add decimals support
- [Security]: SSL? CORS? OAuth?
- [Development]: JSHint
- [Query]: param to return only specific fields
- [Parser]: Create a front end for the parser
- [Query]: Add "X-Total-Count" in response header for item total 
- [Query]: Add "Link" for next/previous pages in response header
- [Rest Api]: Change baseurl to use api/v1
- [Query]: [Pagination optimization to avoid using .skip():https://sammaye.wordpress.com/2012/05/25/mongodb-paging-using-ranged-queries-avoiding-skip/]
----

[MongoDB]:http://docs.mongodb.org/manual/
[node.js]:http://nodejs.org
[express]:http://expressjs.com
[Mongoose]:http://mongoosejs.com/docs/guide.html
[swagger-ui]: https://github.com/swagger-api/swagger-ui
