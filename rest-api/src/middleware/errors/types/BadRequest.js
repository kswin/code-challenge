function BadRequest(message) {
  this.name = '400';
  this.message = message || 'The request could not be understood by the server due to malformed syntax.';
}

BadRequest.prototype = Object.create(Error.prototype);
BadRequest.prototype.constructor = BadRequest;

module.exports = BadRequest;