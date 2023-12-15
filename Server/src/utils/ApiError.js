"use strict";

class ApiError extends Error {
  constructor(status, message, error = true, stack = "") {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
