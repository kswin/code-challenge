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
3. From another tab in your Terminal, clone the git project
```sh
$ git clone https://github.com/kswin/code-challenge.git code-challenge
```
4. Install dependencies
```sh
$ cd code-challenge
$ npm install -g gulp //globally install gulp for easier development
$ npm install
```
5. Build the app
```sh
gulp
```
6. Start the app
```sh
$ DEBUG=code_challenge:* npm start
```

### Development
- //TODO
- Add test instructions

### TODOs
- SSL? CORS?
- Filters/Sorting
    - Add Modified/Creation date ?
    - Question type
    - Pagination
- Error Handlers
    - Distractors 
        - should not equal answer
        - should not equal other distractors in the set
    - Add error responses to swagger docs
- JSHint

### License 
//TODO 

----

**Free Software, Hell Yeah!**
[MongoDB]:http://docs.mongodb.org/manual/
[node.js]:http://nodejs.org
[express]:http://expressjs.com
[Mongoose]:http://mongoosejs.com/docs/guide.html
[swagger-ui]: https://github.com/swagger-api/swagger-ui
