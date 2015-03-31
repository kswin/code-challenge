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
- Filters/Sorting
    - filter by Modified date?
    - Pagination
    - update swagger docs with new params for GETs

=================
- Error Handlers
    - Add error responses to swagger docs
    - not found 404
    - bad request 400 (e.g. invalid params)
    - generic 500
    - Limit the distractors length
    - Unit test validation

=================
    - Unit test for filters/error setup?
=================

- Create instructions on how to use the REST API and parser
- Swagger UI has a bug with multi params https://github.com/swagger-api/swagger-ui/issues/987
- Create a front end for the parser

### Nice to have
- Decimal points in answers and questions
- SSL? CORS? OAuth?
- JSHint

----

[MongoDB]:http://docs.mongodb.org/manual/
[node.js]:http://nodejs.org
[express]:http://expressjs.com
[Mongoose]:http://mongoosejs.com/docs/guide.html
[swagger-ui]: https://github.com/swagger-api/swagger-ui
