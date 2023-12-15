"use strict";

const jwt = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");
const config = require("../config/config");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/types");
const ResponseHelper = require("../utils/responseHandler");
const MESSAGES = require("../constants/response.message");

/**
 * Generate token
 * @param {Object} user
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (user, expires, type, secret = config.jwt.secret) => {
  const payload = {
    _id: user._id,
    role: user.role,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} _id
 * @param {Moment} expires
 * @param {string} type
 * @returns {Promise<User>}
 */
const saveToken = async (token, _id, expires, type) => {
  const userTokenInfo = await User.findById(_id);

  if (!userTokenInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  userTokenInfo.tokens.push({ token, expires, type });
  await userTokenInfo.save();

  return userTokenInfo;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return ResponseHelper.error(res, httpStatus.UNAUTHORIZED, {
        message: MESSAGES.JWT.ERROR,
        error: true,
        status: httpStatus.UNAUTHORIZED,
      });
    }

    if (!config.jwt.secret) {
      throw new Error(MESSAGES.JWT.SECRET_ERROR);
    }

    const decodedToken = jwt.verify(token, config.jwt.secret);

    const userTokenInfo = await User.findOne({
      _id: decodedToken._id,
      tokens: { $elemMatch: { token: token } },
    });

    if (!userTokenInfo) {
      throw new Error(MESSAGES.AUTH.TOKEN.VERIFY.expired_token);
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return ResponseHelper.error(res, httpStatus.UNAUTHORIZED, {
      message: MESSAGES.AUTH.TOKEN.VERIFY.expired_token,
      error: true,
      status: httpStatus.UNAUTHORIZED,
    });
  }
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes",
  );
  const accessToken = generateToken(
    user,
    accessTokenExpires,
    tokenTypes.ACCESS,
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days",
  );
  const refreshToken = generateToken(
    user,
    refreshTokenExpires,
    tokenTypes.REFRESH,
  );
  await saveToken(
    refreshToken,
    user._id,
    refreshTokenExpires,
    tokenTypes.REFRESH,
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};
/**
 * Remove token by user ID
 * @param {ObjectId} _id
 * @param {string} token
 * @returns {Promise<User>}
 */
const removeTokenById = async (userId, token) => {
  const user = await User.findById(_id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  user.tokens = user.tokens.filter((t) => t.token !== token);
  await user.save();

  return user;
};


module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  removeTokenById,
};