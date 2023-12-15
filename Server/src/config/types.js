"use strict";

const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET_PASSWORD: "resetPassword",
  VERIFY_EMAIL: "verifyEmail",
};
const LoginType = {
  EMAIL: "email",
  MOBILE: "mobile",
  FACEBOOK: "facebook",
  GOOGLE: "google",
  APPLE: "apple",
  HOTMAIL: "hotMail",
  YAHOO: "yahoo",
};
module.exports = {
  tokenTypes,
  LoginType,
};
