function BadRequest(message) {
  this.name = 'BadRequest';
  this.message = message || 'The request could not be understood by the server due to malformed syntax.';
}

BadRequest.prototype = Object.create(Error.prototype);
BadRequest.prototype.constructor = BadRequest;

module.exports = BadRequest;