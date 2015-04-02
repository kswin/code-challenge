function NotFound(message) {
  this.name = '404';
  this.message = message || 'The server has not found anything matching the Request-URI';
}

NotFound.prototype = Object.create(Error.prototype);
NotFound.prototype.constructor = NotFound;

module.exports = NotFound;