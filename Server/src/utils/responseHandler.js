"use strict";

class ResponseHelper {
  success(response, status, responseData = {}) {
    return response.status(status).send(responseData);
  }

  error(response, status, responseData = {}) {
    return response.status(status).send(responseData);
  }
  // Emit a response event to the socket with the specified data
  emitResponse(socket, event, data = {}, message, error, status = 200) {
    socket.emit(event, {
      error: error,
      status: status,
      message: message,
      data: data,
    });
  }

  // Emit a success response event to the socket with the specified data
  socketSuccess(socket, event, responseData = {}, message, status = 200) {
    this.emitResponse(socket, event, responseData, message, false, status);
  }

  // Emit an error response event to the socket with the specified error message and status code
  socketError(socket, event, errorMessage, status) {
    this.emitResponse(socket, event, errorMessage, true, status);
  }
}

module.exports = new ResponseHelper();
