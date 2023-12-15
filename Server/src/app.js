"use strict";

const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { jwtStrategy } = require("./config/passport");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middleware/error");
const ApiError = require("./utils/ApiError");
const dbConnection = require('./db/database')
const app = express();

dbConnection();
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use("/_healthcheck", async (_req, res, _next) => {
  const _healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.send(_healthCheck);
  } catch (error) {
    _healthCheck.message = error;
    res.status(503).send();
  }
});
 
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// v1 api routes
app.use("/api/v1", routes);

// 404 Not Found handler
const handleNotFound = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "API path not found"));
};

// Register the 404 handler middleware
app.use(handleNotFound);

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  res
    .status(statusCode)
    .json({ message: message, status: statusCode, error: true });
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
