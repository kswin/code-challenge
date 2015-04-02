function InternalServerError(message) {
  this.name = 'InternalServerError';
  this.message = message || 'The server encountered an unexpected condition which prevented it from fulfilling the request.';
}

InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.constructor = InternalServerError;

module.exports = InternalServerError;
