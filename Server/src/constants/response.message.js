"use strict";

const MESSAGES = {
  AUTH: {
    TOKEN: {
      VERIFY: {
        empty_token: "Auth Token required",
        wrong_token: "Access denied",
        expired_token: "Token has been expired",
        valid_token: "Token is Valid",
        INVALID_LINK: "The Link You Followed Has Expired",
      },
      GENERATE: {
        error: "Failed to generate token",
        success: "Token successfully created",
      },
    },
    REFRESH_TOKEN: {
      VERIFY: {
        empty_token: "Refresh token required",
        success: "Refresh token successfully verified",
      },
      GENERATE: {
        error: "Failed to generate token",
        success: "Refresh token successfully created",
      },
    },
  },

  ADMIN: {
    REGISTER: {
      DUPLICATE_EMAIL: "Email is Already Exist",
      DUPLICATE_USERNAME: "Username already taken, Please choose another one",
      duplicate_user:
        "Thanks, You will receive a confirmation link, If your email does not exists in our database.",
      required: "Required Fields are missing",
      password_error:
        "Password must be at least 8 characters and a mix of uppercase, lowercase letter, a number, and 1 special characters($, @, /, …)",
      success: "Confirmation Email has been sent .",
      reject: "Rejection Email has been sent.",
      WHITE_SPACE: "White Space is not allowed",
      SPECIAL_CHAR: "Password Must Contain One Special character ($, @, /, …)",
      NUMERIC: "Password Must Contain One Numeric Value 0-9",
      UPPER_CASE: "Password Must Contain One UpperCase Value A-Z",
      LOWER_CASE: "Password Must Contain One LowerCase Value a-z",
      failure: "Something went wrong! Please try again later",
      verify_email_error: "Invalid confirmation link. Please try again.",
      verify_email_success: "Email Verified.",
      verify_email_already: "Email Already Verified.",
    },
    PROFILE: {
      SUCCESS: "User Profile fetched",
      FAILURE: "Invalid User Requested",
    },
    LOGIN: {
      wrong_email: "This email doesn't exist",
      unverified_email: "Email must be verified",
      wrong_details: "Incorrect email or password",
      success: "You Have Successfully Logged In",
    },
    UPDATE: {
      failed: "Failed to update user",
      success: "User successfully updated",
      password_update_success: "Password Successfully Changed",
      password_update_failure:
        "Unable to Change Password. Please Try again Later!",
      password_not_match: "Old password not matched!",
    },
    PASSWORD_VERIFICATION: {
      reset_otp_success:
        "Reset password otp has been sent on the your registered email address",
      resend_otp_success:
        "Reset password otp has been resent on the your registered email address",
      otp_validate_success: "Otp has been validate successfully",
    },
    SUCCESS: "User created successfully.",
    ERROR: "Unable to create User, Please try again.",
    ALREADY_EXISTS: "User title already exists",
    DELETED: "User deleted successfully.",
    NOT_FOUND: "User not found",
    FOUND: "User found",
    LIST: "User list fetched",
    FAILURE: "Invalid User",
    UNAUTHRIZED: "Unauthorized User",
  },

  JWT: {
    ERROR: "Failed to authenticate user",
    GENERATE_ERROR: "Failed to sign jwt token",
    USER_ID_ERROR: "Invalid user id",
    SECRET_ERROR: "JWT secret missing",
    EXPIRED: "Token expired",
    SUCCESS: "Success",
  },
  KYC: {
    SUCCESS: "Success",
    FAILURE: "failed",
    DELETE: "deleted",
  },
  FILE_UPLOAD: {
    FILE_REQUIRED: "File is Required ",
    FOLDER_NAME_REQUIRED: "Folder Name is Required",
    SUCCESS: "File upload successfully",
  },
  ENV_ERROR: "Env not loaded",
  DATA_FETCHED: "Data Found Successfully",
  DATA_NOT_FETCHED: "Data not Found",

  FAQ: {
    CREATED: "Faq created successfully",
    UPDATED: "Faq updated successfully",
    LISTED: "Faq listed successfully",
    FETCHED: "Faq fetched successfully",
    DELETED: "Faq deleted successfully",
  },
  CONTENT: {
    CREATED: "Content created successfully",
    UPDATED: "Content updated successfully",
    LISTED: "Content listed successfully",
    FETCHED: "Content fetched successfully",
    DELETED: "Content deleted successfully",
  },
  SUBSCRIPTION: {
    CREATED: "Subscription created successfully",
    UPDATED: "Subscription updated successfully",
    LISTED: "Subscription listed successfully",
    FETCHED: "Subscription fetched successfully",
    DELETED: "Subscription deleted successfully",
  },
  CATEGORY: {
    CREATED: "Category created successfully",
    UPDATED: "Category updated successfully",
    LISTED: "Category listed successfully",
    FETCHED: "Category fetched successfully",
    DELETED: "Category deleted successfully",
  },
  CUSTOMER_SUPPORT: {
    CREATED: "Customer Support created successfully",
    UPDATED: "Customer Support updated successfully",
    LISTED: "Customer Support listed successfully",
    FETCHED: "Customer Support fetched successfully",
    DELETED: "Customer Support deleted successfully",
  },
  BANNER: {
    CREATED: "Banner created successfully",
    UPDATED: "Banner updated successfully",
    LISTED: "Banner listed successfully",
    FETCHED: "Banner fetched successfully",
    DELETED: "Banner deleted successfully",
  },
  TRANSACTION: {
    CREATED: "Transaction created successfully",
    UPDATED: "Transaction updated successfully",
    LISTED: "Transaction listed successfully",
    FETCHED: "Transaction fetched successfully",
    DELETED: "Transaction deleted successfully",
  },
  TRANSACTION_REFUND: {
    CREATED: "Transaction Refund created successfully",
    UPDATED: "Transaction Refund updated successfully",
    LISTED: "Transaction Refund listed successfully",
    FETCHED: "Transaction Refund fetched successfully",
    DELETED: "Transaction Refund deleted successfully",
  },
  DOCUMENT_TEMPLATE: {
    CREATED: "Document Template created successfully",
    UPDATED: "Document Template updated successfully",
    LISTED: "Document Template listed successfully",
    FETCHED: "Document Template fetched successfully",
    DELETED: "Document Template deleted successfully",
  },
  FORM_FIELD: {
    CREATED: "Form Field created successfully",
    UPDATED: "Form Field updated successfully",
    LISTED: "Form Field listed successfully",
    FETCHED: "Form Field  fetched successfully",
    DELETED: "Form Field deleted successfully",
  },

  USER: {
    PROFILE: {
      SUCCESS: "User Profile fetched",
      FAILURE: "Invalid User Requested",
      WALLET: "User Wallet AllReady ",
    },
    LOGIN: {
      wrong_email: "This email doesn't exist",
      unverified_email: "Email must be verified",
      wrong_details: "Incorrect email or password",
      wrong_password: (totalIncorrectAttempts) =>
        `Incorrect password. Incorrect password attempts ${totalIncorrectAttempts}`,
      success: "You Have Successfully Logged In",
      blocked:
        "Your account has been temporarily blocked due to multiple incorrect password attempts. Please try again later.",
    },
    UPDATE: {
      failed: "Failed to update user",
      success: "User successfully updated",
      password_update_success: "Password Successfully Changed",
      password_update_failure:
        "Unable to Change Password. Please Try again Later!",
      password_not_match: "Old password not matched!",
    },
    SUCCESS: "User created successfully.",
    RECORD_SUCCESS: "Record created successfully.",
    ERROR: "Unable to create User, Please try again.",
    ALREADY_EXISTS: "User title already exists",
    DELETED: "User deleted successfully.",
    NOT_FOUND: "User not found",
    FOUND: "User found",
    LIST: "User list fetched",
    FAILURE: "Invalid User",
    UNAUTHRIZED: "Unauthorized User",
  },
  BASIC_SETTING: {
    FETCHED: "Basic Settings fetched successfully",
  },
  DASHBOARD: {
    PERFORMANCE_MANAGEMENT_FETCH:
      "Performance management information fetched successfully",
    SPECIFIC_DETAIL_FETCH: " Specific details fetched successfully",
  },
  CHAT:{
    
  }
};
module.exports = MESSAGES;
