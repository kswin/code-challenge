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
- Install [MongoDB] and [node.js]
- From a tab in your Terminal, start MongoDB in the background
```sh
$ mongod
``` 
- From another tab in your Terminal, clone the git project
```sh
$ git clone https://github.com/kswin/code-challenge.git code-challenge
```
- Install dependencies
```sh
$ cd code-challenge
$ npm install -g gulp //globally install gulp for easier development
$ npm install
```
- Build the app
```sh
gulp
```
- Start the app
```sh
$ DEBUG=code-challenge:* npm start
```

### Development
- TODO - add test instructions

### TODOs
- Filters/Sorting
    - Add Modified/Creation date ?
    - Question type
    - Pagination
- Error Handlers
    - Distractors 
        - should not equal answer
        - should not equal other distractors in the set
    - Add error responses to swagger docs
    - Trim trailing/leading spaces

### Nice to have
- Decimal points in answers and questions
- SSL? CORS?
- JSHint/JSCS


----

[MongoDB]:http://docs.mongodb.org/manual/
[node.js]:http://nodejs.org
[express]:http://expressjs.com
[Mongoose]:http://mongoosejs.com/docs/guide.html
[swagger-ui]: https://github.com/swagger-api/swagger-ui
